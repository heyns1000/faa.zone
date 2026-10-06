# aligned/01-root: folder 1 of the A–Z audit (faa.zone root)

Nothing on `main` is moved or changed. This folder holds the best existing version of each root page,
found by reading every version across faa.zone's 15 branches, their full history and the other ecosystem repos.
Nothing is newly written except the connector noted below.

| Page | Versions found | Version used (the tail) | Change | Tested |
|---|---|---|---|---|
| `index.html` "Water the Seed™ \| CodeNest Ecosystem" | 5 in history: Apr 2025 Vault Interface, Apr 2025 (8 KB), Apr 2025 empty, May 2025 TailAdmin stub, Dec 2025 | faa.zone `main` (Dec 2025, blob `c6abbd47`), the newest and only complete one | none | audit: no broken controls |
| `Bushportal.html` "BushPortal™ - Global Podcast Network" | 1 (Jan 2026) | faa.zone `main`, blob `6cc7130c` | none | audit: no broken controls |
| `baobab_ignition_set.html` "Baobab Ignition Set™" | 1 (Oct 2025), identical on 12 branches | faa.zone `main`, blob `642af1f2` | none | audit: no broken controls |
| `global_dream.html` "FAA™ Global Ecosystem: B2B Compliance-as-a-Service" | 1 (Oct 2025), identical on 12 branches | faa.zone `main`, blob `2d7a3283` | none | audit: no broken controls |
| `VAULTPRAYER.html` "Fruitful™ Global \| Master Live Demo" (VaultPrayer™) | 1 (Nov 2025), identical on 12 branches | faa.zone `main` `VAULTPRAYER.HTML`, blob `ff816169` | **connector added** (see below) | 11 of 11 dashboard screens open; no console errors |
| `codenest-dashboard.html` "CodeNest™ Dashboard" | 8 across ai-logic.seedwave (3), FruitfulPlanetChange (mining, toynest, samfox template), ThesisGallery, fruitful (27 KB stub) | `heyns1000/ai-logic.seedwave.faa.zone` `public/dashboard.html` @ `d06b51a` (2 Jun 2026): newest, largest (241 KB), all 15 screens | none, copied byte-for-byte (blob `65104364`) | each screen opens from its `#hash` |

## The one connector

`VAULTPRAYER.html`'s 12 dashboard buttons call `showDashboardSection(...)`. No version of the page, in any branch
or in its history, ever defined that function, so every button did nothing. Its screens
(`projects-view`, `scroll-builder-view`, `templates-view`, …) are the CodeNest™ Dashboard's screens, and the newest
full dashboard opens any screen from the URL hash. The 3-line function added before `</body>` sends each button to
`codenest-dashboard.html#<screen>`.

## Still open (no existing version found)

- `legal_popi.html`, `legal_paia.html` (VaultPrayer footer): no POPI Act or PAIA manual exists in any repo searched,
  including `footer.global.repo`. Needs the owner's legal text; not invented here.
- 2 controls with no action in any version: "Explore Banimal™'s World" and "Load More Prayers".

## Fixed from the global footer

- VaultPrayer's "Terms & Conditions (Legal)" link (`legal_terms.html`, missing) now opens
  `../00-global-footer/terms.html`, the global footer repo's terms page (blob `30d5cb7d`).
