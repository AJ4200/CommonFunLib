# CommonFunLib

CommonFunLib is a small developer utility toolkit for common functions, sample data generation, unit conversion, and hashing.

Use it three ways:

- Explore and test utilities in the `cfl-web` playground.
- Call the Express API from another app or service.
- Install the npm package and import only the helpers you need.

The original Java implementation is deprecated and kept only for historical reference.

## Quick Start

### Web Playground

```sh
cd cfl-web
npm install
npm run dev
```

Open `http://localhost:3000`.

### API Server

```sh
cd cfl-api
pnpm install
pnpm start
```

The API runs on `PORT` or `3001` by default.

### npm Package

After publishing:

```sh
npm install commonfunlib
```

```js
import { isEven, generatePassword, convertLength, sha256 } from "commonfunlib";

isEven(42);
generatePassword(16);
convertLength(12, "m", "foot");
sha256("CommonFunLib");
```

CommonJS is supported too:

```js
const { common, generate, convert, hash } = require("commonfunlib");

common.isPrime(17);
generate.uuid();
convert.temperature(22, "C", "F");
hash.base64Encode("hello");
```

## What It Includes

- Common functions: even/odd checks, factorial, GCD, LCM, prime checks, string reversal, palindrome checks, slugify, clamp, and percentage.
- Generators: random names, numbers, passwords, UUIDs, tokens, PINs, colors, and placeholder text.
- Converters: length, weight, temperature, area, data size, speed, and optional currency conversion.
- Hashing: MD5, SHA variants, Base64 encode/decode, and HMAC SHA256.

## API Examples

- `GET /common/even?num=42`
- `GET /generate/uuid`
- `POST /convert/length`
- `POST /hash/sha256`
- `GET /status`

## Project Layout

```txt
cfl-api/   Express API and npm package entry
cfl-web/   Next.js playground and docs app
src/       Deprecated Java source files
data/      Deprecated Java name data files
```

## Deprecated Java Library

The Java source in `src`, name data in `data`, and `CommonFunLib.jar` are no longer the active implementation.

New work should use the npm package, API server, or web playground.
