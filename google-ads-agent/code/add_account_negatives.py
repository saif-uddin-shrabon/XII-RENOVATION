"""Builds an all-PHRASE negative keyword list as a shared set and attaches it at the
ACCOUNT level via CustomerNegativeCriterion (negative_keyword_list), so it applies to
every campaign the account ever runs - including future ones. Idempotent.

The built-in list is a STARTER: about thirty generic junk terms (STARTER_NEGATIVES in
code/_common.py - job seekers, do-it-yourselfers, courses, freebies, lookups) plus the
"What we DON'T do" section of context/business.md. It is not an account's real list.
The real one is staged from the account's own search terms and passed with --terms-file.

Dry run by default: it prints every term and changes nothing without --apply.

  python3 code/add_account_negatives.py                                    # show the starter list
  python3 code/add_account_negatives.py --terms-file <file> --name "<list name>"   # show a staged list
  python3 code/add_account_negatives.py --terms-file <file> --name "<list name>" --apply
"""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
import _business as biz
from _common import STARTER_NEGATIVES

load_dotenv()

config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID") or None,
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(config)
customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
ga = client.get_service("GoogleAdsService")

# From context/business.md - "## What we DON'T do", read at run time by _business.py, so this is
# always THIS account's list and never somebody else's trade. (An earlier version shipped a
# residential plumber's list here - "hvac", "septic", "pool" - which would have blocked an HVAC
# company's own buyers.) ⛔ Never block a word you sell to, never block a city you serve.
DONT_DO = biz.not_offered()
SELLS = biz.sells()

ALL_TERMS = STARTER_NEGATIVES + DONT_DO


LIST_NAME = "Account-Level Starter Negatives (All Phrase)"


def find_or_create_shared_set() -> str:
    q = f"""
        SELECT shared_set.resource_name FROM shared_set
        WHERE shared_set.type = 'ACCOUNT_LEVEL_NEGATIVE_KEYWORDS'
          AND shared_set.name = '{LIST_NAME}'
          AND shared_set.status != 'REMOVED'
    """
    for row in ga.search(customer_id=customer_id, query=q):
        return row.shared_set.resource_name
    svc = client.get_service("SharedSetService")
    op = client.get_type("SharedSetOperation")
    op.create.name = LIST_NAME
    op.create.type_ = client.enums.SharedSetTypeEnum.ACCOUNT_LEVEL_NEGATIVE_KEYWORDS
    resp = svc.mutate_shared_sets(customer_id=customer_id, operations=[op])
    return resp.results[0].resource_name


def existing_terms(shared_set_rn: str) -> set[str]:
    q = f"""
        SELECT shared_criterion.keyword.text FROM shared_criterion
        WHERE shared_criterion.shared_set = '{shared_set_rn}'
          AND shared_criterion.type = 'KEYWORD'
    """
    return {r.shared_criterion.keyword.text.lower()
            for r in ga.search(customer_id=customer_id, query=q)}


def add_terms(shared_set_rn: str, terms: list[str]) -> int:
    have = existing_terms(shared_set_rn)
    todo = [t for t in terms if t.lower() not in have]
    if not todo:
        return 0
    svc = client.get_service("SharedCriterionService")
    ops = []
    for text in todo:
        op = client.get_type("SharedCriterionOperation")
        c = op.create
        c.shared_set = shared_set_rn
        c.keyword.text = text
        c.keyword.match_type = client.enums.KeywordMatchTypeEnum.PHRASE
        ops.append(op)
    added = 0
    for i in range(0, len(ops), 1000):
        resp = svc.mutate_shared_criteria(customer_id=customer_id, operations=ops[i:i + 1000])
        added += len(resp.results)
    return added


def attach_to_account(shared_set_rn: str) -> None:
    q = """
        SELECT customer_negative_criterion.negative_keyword_list.shared_set
        FROM customer_negative_criterion
        WHERE customer_negative_criterion.type = 'NEGATIVE_KEYWORD_LIST'
    """
    attached = {r.customer_negative_criterion.negative_keyword_list.shared_set
                for r in ga.search(customer_id=customer_id, query=q)}
    if shared_set_rn in attached:
        print("  · already attached at account level")
        return
    svc = client.get_service("CustomerNegativeCriterionService")
    op = client.get_type("CustomerNegativeCriterionOperation")
    op.create.negative_keyword_list.shared_set = shared_set_rn
    svc.mutate_customer_negative_criteria(customer_id=customer_id, operations=[op])
    print("  ✓ attached at account level (applies to all current and future campaigns)")


def verify(shared_set_rn: str) -> None:
    count = len(existing_terms(shared_set_rn))
    print(f"\nVerification: list contains {count} negative keywords (all PHRASE match)")


def load_terms_file(path: str) -> list[str]:
    """One PHRASE term per line; blank lines and # comments ignored; quotes stripped."""
    out = []
    for line in open(path, encoding="utf-8"):
        t = line.split("#", 1)[0].strip().strip('"')
        if t:
            out.append(t)
    return out


def main() -> None:
    import argparse
    global LIST_NAME
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--terms-file", help="use these terms instead of the built-in starter list "
                                         "(the starter is a starting point, not an account's real list)")
    ap.add_argument("--name", help="shared list name (default: the name set at the top of this file)")
    ap.add_argument("--apply", action="store_true", help="actually create/add/attach - default is a dry run")
    args = ap.parse_args()
    if args.name:
        LIST_NAME = args.name
    source = load_terms_file(args.terms_file) if args.terms_file else ALL_TERMS
    if not args.terms_file:
        print(f"STARTER LIST · {len(STARTER_NEGATIVES)} generic junk terms built in · "
              "the account's real list comes from its own search terms (--terms-file)")
        print(f"{len(DONT_DO)} don't-do term(s) read from context/business.md"
              + ("" if DONT_DO else " - fill '## What we DON'T do' or pass --terms-file"))
    # de-dupe while preserving order
    seen: set[str] = set()
    terms = [t for t in source if not (t.lower() in seen or seen.add(t.lower()))]
    # ⛔ Never push a negative that names what this business sells ("## What we do").
    held = [t for t in terms if any(w and (w in t.lower() or t.lower() in w) for w in SELLS)]
    if held:
        print(f"held back {len(held)} term(s) that name a service you sell: " + ", ".join(f'"{t}"' for t in held))
        terms = [t for t in terms if t not in held]
    if not args.apply:
        print(f"DRY RUN · list '{LIST_NAME}' · {len(terms)} unique PHRASE terms would be added and "
              f"attached at ACCOUNT level:")
        for t in terms:
            print(f'  "{t}"')
        print("\nRe-run with --apply to make the changes.")
        return
    rn = find_or_create_shared_set()
    print(f"List: '{LIST_NAME}' ({rn})")
    added = add_terms(rn, terms)
    print(f"✓ {len(terms)} unique PHRASE terms; added {added} this run\n\nAttaching to account:")
    attach_to_account(rn)
    verify(rn)


if __name__ == "__main__":
    try:
        main()
    except GoogleAdsException as e:
        print(f"✗ Google Ads API error (request_id {e.request_id}):")
        for err in e.failure.errors:
            print(f"  - {err.message}")
        raise SystemExit(1)
