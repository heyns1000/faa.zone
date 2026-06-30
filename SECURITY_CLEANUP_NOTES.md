# Security Cleanup Notes — faa.zone

> Generated: 2026-06-30 | Branch: security/repo-cleanup
> Status: ACTIVE REMEDIATION REQUIRED

---

## CRITICAL — Actions Required in Terminal (Cannot be done via web UI)

### 1. Rotate PayPal Live Credentials IMMEDIATELY

Live PayPal credentials are exposed in `heyns1000/seedwave` — `api/index.js` lines 44-45.

**Steps:**
1. Go to https://developer.paypal.com/dashboard/applications/live
2. Regenerate Client Secret for your live app
3. Update in Vercel: `PAYPAL_LIVE_CLIENT_ID` and `PAYPAL_LIVE_CLIENT_SECRET`
4. Never use hardcoded fallback values in code — use `throw new Error('Missing env: PAYPAL_LIVE_CLIENT_SECRET')` instead

---

### 2. Remove Large Binary Files from Git History

These files are currently committed to this public repo and bloat it by ~18MB:

| File | Size | Action |
|---|---|---|
| `tailadmin-vue-pro-2.x.zip` | 8.4MB | Remove + check licence |
| `Fruitful_crate_dance_Water_the_Seed.png` | 5.87MB | Move to CDN/assets |
| `Noodle_juice_gorilla_comb.png` | 3.58MB | Move to CDN/assets |
| `setup1.png` | 508KB | Move to assets/ |

**Terminal commands to run locally:**

```bash
# Step 1: Remove from index (stops tracking)
git rm --cached tailadmin-vue-pro-2.x.zip
git rm --cached Fruitful_crate_dance_Water_the_Seed.png
git rm --cached Noodle_juice_gorilla_comb.png
git rm --cached setup1.png
git rm --cached api/.DS_Store
git rm --cached .DS_Store

# Step 2: Commit the removal
git commit -m "security: remove large binary files and DS_Store from tracking"

# Step 3: Purge from full git history (IMPORTANT - stops it being downloadable)
pip install git-filter-repo
git filter-repo --path tailadmin-vue-pro-2.x.zip --invert-paths
git filter-repo --path Fruitful_crate_dance_Water_the_Seed.png --invert-paths
git filter-repo --path Noodle_juice_gorilla_comb.png --invert-paths

# Step 4: Force push (coordinate with team first)
git push origin main --force-with-lease
```

---

### 3. Remove .env.local from seedwave repo

```bash
cd ../seedwave
git rm --cached .env.local
echo ".env.local" >> .gitignore
git commit -m "security: remove .env.local from tracking"
git push origin main
```

---

### 4. Remove hardcoded PayPal fallbacks from seedwave/api/index.js

Replace lines 44-45 in `api/index.js`:

```js
// BEFORE (DANGEROUS):
const PAYPAL_CLIENT_ID = process.env.PAYPAL_LIVE_CLIENT_ID || 'BAAThS_oBJJ22PM...';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_LIVE_CLIENT_SECRET || 'EFSS4mbI...';

// AFTER (SAFE):
if (!process.env.PAYPAL_LIVE_CLIENT_ID || !process.env.PAYPAL_LIVE_CLIENT_SECRET) {
  throw new Error('Missing required PayPal env vars. Set PAYPAL_LIVE_CLIENT_ID and PAYPAL_LIVE_CLIENT_SECRET in Vercel.');
}
const PAYPAL_CLIENT_ID = process.env.PAYPAL_LIVE_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_LIVE_CLIENT_SECRET;
```

---

### 5. Delete noise branches

```bash
# Delete the hallucination branches across repos
git push origin --delete copilot/master-bad-boys-song
# Repeat for each repo that has this branch
```

---

## What This Branch Already Fixed (via web UI)

| File | Change | Commit |
|---|---|---|
| `vercel.json` | Added HSTS, CSP, X-Frame, XSS, Referrer, Permissions-Policy headers | first commit |
| `.gitignore` | Uncommented *.png/jpg/jpeg/gif, added specific binary names, added secrets patterns | d0812e4 |
| `docs/_config.yml` | Fixed url to https://faa.zone, set baseurl to empty string | 69d51fc |

---

## Environment Variables Checklist — Vercel (faa.zone / banimal-global-loop)

| Variable | Status | Where to set |
|---|---|---|
| `PAYPAL_LIVE_CLIENT_ID` | Set in Vercel only — NOT in code | seedwave Vercel project |
| `PAYPAL_LIVE_CLIENT_SECRET` | Set in Vercel only — NOT in code | seedwave Vercel project |
| `PERPLEXITY_API_KEY` | Already added to banimal-global-loop | banimal Vercel project |
| `ZEPTOMAIL_TOKEN` | NOT YET SET — blocks all 12 email templates | banimal Vercel project |
| `ADMIN_SECRET_TOKEN` | NOT YET SET — needed for seedwave route auth | seedwave Vercel project |

---

## Next Steps After Merging This Branch

1. Merge this PR into main
2. Run the terminal commands in Section 2 and 3 above
3. Rotate PayPal credentials (Section 1)
4. Set missing Vercel env vars (Section 5 table)
5. Add `/api/fruitful-assist` chat route to banimal using PERPLEXITY_API_KEY
6. Merge dependabot branches (tar vulnerability fix) across faa.zone and seedwave
7. Delete `copilot/master-bad-boys-song` branches across all repos
