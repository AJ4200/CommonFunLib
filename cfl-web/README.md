# CommonFunLib Web

The web app is a Next.js playground and documentation surface for CommonFunLib.

It lets users:

- Try utilities in browser playgrounds.
- Inspect API routes and request examples.
- Copy npm install and import snippets.
- Switch themes from the app shell.

## Getting Started

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

The app redirects to `/homepage` after a theme is selected.

## API Configuration

The web app calls the CommonFunLib API through `NEXT_PUBLIC_API_BASE_URL`.

```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 npm run dev
```

If no value is provided, it defaults to `http://localhost:3001`.

## Main Areas

- `Overview`: project summary, npm package examples, API summary.
- `Functions`: common number and string helpers.
- `Generators`: sample data and identifiers.
- `Converters`: unit and data-size conversions.
- `Hashing`: digests, Base64, and HMAC helpers.

Each utility section has `Docs`, `Playground`, `API`, and `Package` modes.

## Validation

```sh
npx tsc --noEmit
```
