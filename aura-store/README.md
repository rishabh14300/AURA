# AURA Store

AURA is a Next.js storefront using Tailwind CSS 3.4.17 and a warm editorial
atelier design system.

## Development

```bash
npm install
npm run dev
```

The Webpack development server runs at [http://localhost:3000](http://localhost:3000)
and uses `.next/` for its development cache.

## Production build

```bash
npm run build
npm run start
```

The Webpack production build is written to `build/`. Run `npm run start` after
a successful build to serve it.

## Design system

- `src/app/variables.css` is the source of truth for palette, typography, and
  atelier tokens.
- `src/app/globals.css` imports those tokens and defines global typography,
  buttons, focus states, and accessibility motion behavior.
- `tailwind.config.js` maps the design tokens to Tailwind utilities.
- `src/components/layout/StoreHeader.js` provides responsive catalog navigation,
  search, and the shopping bag.
- `src/components/layout/StoreFooter.js` provides the responsive editorial
  footer. Catalog links open the corresponding search filter; newsletter signup
  remains a coming-soon placeholder until a subscription service is configured.

Button classes include `.button--primary`, `.button--secondary`,
`.button--ghost`, and `.button--quick-add`; use `.button--compact` or
`.button--large` for size variants. Typography helpers include `.text-display`,
`.text-lead`, `.body-regular`, `.body-small`, and `.eyebrow`.

The base palette uses obsidian `#111111`, clay `#B85A34`, tertiary `#F5F4F0`,
and neutral `#FAF9F6`, with warm ink and surface shades defined alongside them.
