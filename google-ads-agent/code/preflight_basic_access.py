"""Pre-checks for Google Ads API brand verification (the gate to Basic access).

Fetches the four pages verification opens, checks the name and address are on them, and matches
the email domain. The rest is printed as a manual checklist at the end.

Usage:
  python3 code/preflight_basic_access.py --url https://yoursite.com \
      --name "Acme Plumbing" --email you@acmeplumbing.com --address "123 Main St"

Exit code 1 if any check FAILs. stdlib only.
"""

import argparse
import re
import sys
import urllib.error
import urllib.request
from html import unescape
from urllib.parse import urlparse

PAGES = ["/", "/about", "/privacy-policy", "/terms"]
FREE_EMAIL = {"gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com"}
results = []


def record(status, name, detail):
    results.append((status, name, detail))


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (preflight check)"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, resp.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:  # noqa: BLE001 - any network failure is a FAIL for the reviewer too
        return 0, str(e)


def text_of(html):
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    return unescape(re.sub(r"<[^>]+>", " ", html)).lower()


def check_site(base, name, address):
    base = base.rstrip("/")
    home_text = ""
    for path in PAGES:
        status, body = fetch(base + path)
        if status != 200:
            record("FAIL", f"page {path}", f"returned {status or 'no response'} - brand verification opens this page")
            continue
        words = len(text_of(body).split())
        if words < 60:
            record("FAIL", f"page {path}", f"only {words} words - reads as a placeholder page")
        else:
            record("PASS", f"page {path}", f"200, {words} words")
        if path == "/":
            home_text = text_of(body)
        if path in ("/", "/about") and address:
            if address.lower() in text_of(body):
                record("PASS", f"address on {path}", "physical address is on the page")
            else:
                record("WARN" if path == "/" else "FAIL", f"address on {path}", f"'{address}' not found on the page")
    if home_text:
        if name.lower() in home_text:
            record("PASS", "name on site", f"'{name}' appears on the homepage")
        else:
            record("FAIL", "name on site", f"'{name}' is not on the homepage - the consent screen name and the site must match")


def check_email(email, base):
    domain = email.split("@")[-1].lower()
    site_host = urlparse(base).netloc.lower().removeprefix("www.")
    if domain == site_host:
        record("PASS", "email matches site", f"{domain}")
    elif domain in FREE_EMAIL:
        record("WARN", "email matches site", f"{domain} is a free inbox - mild mismatch, approvals still happen; a domain email is safer")
    else:
        record("WARN", "email matches site", f"{domain} != {site_host} - be ready to explain the link")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--name", required=True, help="business name exactly as typed on the OAuth consent screen")
    ap.add_argument("--email", required=True, help="the contact email on the OAuth consent screen")
    ap.add_argument("--address", default="", help="street address as written on the site")
    args = ap.parse_args()

    check_site(args.url, args.name, args.address)
    check_email(args.email, args.url)

    width = max(len(n) for _, n, _ in results)
    for status, name, detail in results:
        print(f"{status:4}  {name.ljust(width)}  {detail}")
    fails = sum(1 for s, _, _ in results if s == "FAIL")
    print("\nManual checks (no script can see these):")
    print("  [ ] OAuth consent screen is External and In production, every Branding field filled - verification skips it otherwise")
    print("  [ ] the Cloud project's IAM owner or editor list holds an inbox you read - Google's notices go there now")
    print("  [ ] no account this project calls has a policy suspension or open policy flag")
    print(f"\n{fails} FAIL" + ("" if fails == 1 else "S") + (" - fix before verifying" if fails else " - ready for brand verification"))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
