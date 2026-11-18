# Google Ads Agent

Run your own Google Ads with Claude Code. Eight commands, one repo, free. The API scripts are already written, so Claude runs them instead of spending hours writing them. Everything it builds lands paused - nothing spends until you say yes.

```
git clone https://github.com/youtube-jono/google-ads-agent.git
cd google-ads-agent
claude
/api-setup
```

There is no setup step. Each command asks for exactly what it needs, the first time you run it.

## The path (run them in this order)

1. `/api-setup` - connect Claude Code to your Google Ads account: a Google Cloud project, Explorer access the same day, Basic access in minutes
2. `/audit` - already running ads? Start here after connecting. It reads the account, prices every leak, builds a dashboard, then fixes the list after one approval
3. `/keywords` - every keyword worth bidding on, with real search volume and click cost, grouped by service into your account structure
4. `/campaign-plan` - the lead conversion actions, then one campaign with three ad groups, built through the API, all paused
5. `/write-ads` - two ads for one ad group (15 headlines and 4 descriptions each), plus the call, message, lead form, callout, snippet, name and logo assets
6. `/build-website` - no site yet? The one in `website/` becomes yours: pick a style, answer eight questions, add photos
7. `/landing-page` - a starter landing page for the ad group, with the form and the phone calls counted in Google Ads
8. `/publish` - GitHub and Vercel, your own domain, then the ads are pointed at the landing page

**No website yet?** Run `/api-setup`, then `/build-website` and `/publish`, then carry on from `/keywords`. Google only gives the search volume numbers to an account with a live site behind it.

## Connecting Google Ads

`/api-setup` walks you through it at your own pace. New to it, allow about 25 minutes. The short version, as in the video:

1. Make a Google Cloud project, enable the Google Ads API, apply for Explorer access and then Basic
2. Make an OAuth consent screen and a Desktop OAuth client, and download its JSON file
3. Drag that file into this folder and tell Claude: **"please read credentials.json and connect me into Google Ads"**

No developer token and no manager account are needed. One thing the video does not say: **publish the OAuth app** (OAuth consent screen, Audience, Publish app). If it stays in Testing, your login expires after 7 days and every command stops working. `/api-setup` checks this for you.

## What you need

- [Claude Code](https://claude.com/claude-code) (the VS Code extension is the easiest way in)
- Python 3.10 or newer, and Node.js 18 or newer for the website. Claude installs the packages the first time a command needs them
- A Google Ads account, even a brand new one
- A GitHub account and a Vercel account for `/publish` (both free - the command walks you through creating them), and a domain you own
- Somewhere for leads to go. Calls and form leads land in GoHighLevel through one webhook. Paid members get a GHL account for $1 a month. Any other CRM with an inbound webhook works too

Your keys live in `.env`, which is never committed. Nothing in this repo sends them anywhere except Google.

## What's in the paid version

This is the free version, frozen at the video. The paid community has the living one: the full account setup, the context layer that scrapes your proof, the competitor scout, the full 18-part landing page and the sitelink pages, Local Services Ads, the daily search-terms pass, the fortnightly ad tests, account scaling, and the client proposal.

Free community and every free blueprint: https://www.skool.com/automatable-free/about
Paid community, 7-day trial: https://www.skool.com/automatable/about
