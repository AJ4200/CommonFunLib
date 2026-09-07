# CommonFunLib 1.0.3

CommonFunLib 1.0.3 is a practical expansion release focused on validation,
text shaping, developer identity generation, pressure conversion, and URL-safe
data handling.

## Highlights

- Validate email-shaped input with `isValidEmail`.
- Bound display or slug input with `truncate`.
- Generate readable usernames from the bundled name banks.
- Convert pressure between Pa, kPa, bar, PSI, and atm.
- Encode and decode URL components.
- Generate QR code data URLs.
- Turn files up to 5 MB into deterministic SteganoPass seeds, keys, passwords, and IDs.
- Use the npm package as a web playground fallback when the API is unavailable.

## Install

```sh
npm install commonfunlib@1.0.3
```

## Verification

- Node package smoke tests pass for all new helpers.
- API JavaScript syntax checks pass.
- Web TypeScript validation passes.
- API and web upload limit messaging are covered at the 5 MB boundary.

## GitHub release

Suggested tag: `v1.0.3`

Suggested title: `CommonFunLib 1.0.3`

Use this file as the release body when creating the GitHub release for tag
`v1.0.3`.