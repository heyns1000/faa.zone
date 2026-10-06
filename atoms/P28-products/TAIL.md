# P28 Products: the tail

**Tail = vaultmesh `products.html` (2025-06-15, blob `dadb0fbf`)**: highest score of 11 versions (functions ×2 + labels + buttons + link health ×25 + size). 1 functions, 66 labels.

## What other versions have that the tail lacks

- **2 version(s)** (2025-06-11 → 2025-06-21; FGP--samfox `public/index.html`): labels: Business Package | Display prices in: | Enterprise Package | Explore Our Products | FAA.ZONE™ | Starter Package | Subscribe Now (Monthly); functions: fetchExchangeRates, getCurrencySymbol, initiatePayPalSubscription, updatePrices
- **2 version(s)** (2025-06-11 → 2025-06-11; FGP--samfox `public/index.html`): labels: Business Package | Buy Now | Display prices in: | Explore Our Products | FAA.ZONE™ | Starter Package; functions: fetchExchangeRates, getCurrencySymbol, updatePrices
- **1 version(s)** (2025-06-11 → 2025-06-11; FGP--samfox `public/index.html`): labels: Business Package | Buy Now | Explore Our Products | FAA.ZONE™ | Starter Package
- **1 version(s)** (2025-06-11 → 2025-06-11; faa.zone `public/legal/pricing.html`): labels: Business Package | Display prices in: | Enterprise Package | Explore Our Products | FAA.ZONE™ | Starter Package | Subscribe Now (Monthly); functions: copyCode, fallbackCopyTextToClipboard, fetchExchangeRates, getCurrencySymbol, initiatePayPalSubscription, updatePrices
- **1 version(s)** (2025-06-12 → 2025-06-12; faa.zone `public/legal/pricing.html`): labels: About Us ℹ️ | Business Package | Contact | Contact Us 📧 | Display prices in: | Enterprise Package | Explore Our Products | FAA.ZONE™ | Home | Monthly (15% off) Annual | Pricing & Plans 💰 | Privacy | Products | Starter Package | Subscribe Now; functions: copyCode, fallbackCopyTextToClipboard, fetchExchangeRates, getCurrencySymbol, initiatePayPalSubscription, showTemporaryMessage, toggleSubscriptionType, updatePrices
- **3 version(s)** (2025-06-12 → 2025-12-26; codenest `packages/apps/seedwave-core/public/products.html`, faa.zone `public/legal/pricing.html`): labels: About Us ℹ️ | Business Package | Contact | Contact Us 📧 | Display prices in: | Enterprise Package | Explore Our Products | FAA.ZONE™ | Home | Pricing & Plans 💰 | Privacy | Products | Starter Package | Subscribe Now (Monthly) | Terms; functions: fetchAllExchangeRates, getCurrencySymbol, initiatePayPalSubscription, showTemporaryMessage, updatePricesForSection

## Graft list (each missing part once, from the newest version that has it)

| Part | Kind | Take from | First seen | Blob |
|---|---|---|---|---|
| copyCode | function | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
| fallbackCopyTextToClipboard | function | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
| fetchAllExchangeRates | function | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| fetchExchangeRates | function | FGP--samfox `public/index.html` | 2025-06-21 | `7ad8a945` |
| getCurrencySymbol | function | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| initiatePayPalSubscription | function | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| showTemporaryMessage | function | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| toggleSubscriptionType | function | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
| updatePrices | function | FGP--samfox `public/index.html` | 2025-06-21 | `7ad8a945` |
| updatePricesForSection | function | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| About Us ℹ️ | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Business Package | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Buy Now | label | FGP--samfox `public/index.html` | 2025-06-11 | `34994828` |
| Contact | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Contact Us 📧 | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Display prices in: | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Enterprise Package | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Explore Our Products | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| FAA.ZONE™ | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Home | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Monthly (15% off) Annual | label | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
| Pricing & Plans 💰 | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Privacy | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Products | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Starter Package | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Subscribe Now | label | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
| Subscribe Now (Monthly) | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| Terms | label | codenest `packages/apps/seedwave-core/public/products.html` | 2025-12-26 | `3f89ace4` |
| 🦍 FAA.ZONE™ | label | faa.zone `public/legal/pricing.html` | 2025-06-12 | `6cf7acc4` |
