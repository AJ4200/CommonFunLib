# CommonFunLib

CommonFunLib is a small Node utility package for everyday helpers: number and
string checks, random data generation, unit conversion, hashing, Base64, and
HMAC signing.

It can also run the same utilities as an Express API.

## Version 0.0.2

This release expands the computing toolkit with Fibonacci, average, median,
title case, word count, Nano IDs, API keys, MAC addresses, semver strings,
timestamps, number-base conversion, duration conversion, timestamp conversion,
color conversion, SHA3 hashing, Base64URL helpers, HMAC SHA512, and checksums.

## Install

```sh
npm install commonfunlib
```

## Use As A Package

```js
import {
  isEven,
  fibonacci,
  slugify,
  generateApiKey,
  convertNumberBase,
  sha3_256,
} from "commonfunlib";

console.log(isEven(42));
console.log(fibonacci(8));
console.log(slugify("My New Tool"));
console.log(generateApiKey("cfl", 24));
console.log(convertNumberBase("255", 10, 16));
console.log(sha3_256("CommonFunLib"));
```

Grouped helpers are also available:

```js
import { common, generate, convert, hash } from "commonfunlib";

common.isPrime(17);
generate.nanoid(21);
convert.timestamp("2026-06-28T12:00:00.000Z", "iso", "seconds");
hash.base64UrlEncode("hello world");
```

If you prefer classes:

```js
const { Converter, Generator, Hashing, CommonFunctions } = require("commonfunlib");

const converter = new Converter();
const generator = new Generator();

converter.convertWeight(5, "kg", "lb");
generator.generateApiKey("cfl", 24);
Hashing.hmacSha512("payload", "secret");
CommonFunctions.average("4,8,15,16,23,42");
```

## Run The API Server

From this package folder:

```sh
npm start
```

After publishing, consumers can also run:

```sh
npx commonfunlib-api
```

The API listens on `PORT` or `3001` by default.

## Currency Conversion

Currency conversion uses `FREECURRENCYAPI_KEY` from the environment.

```sh
FREECURRENCYAPI_KEY=your-key npm start
```

For direct package use:

```js
const { fetchExchangeRates, convertCurrency } = require("commonfunlib");

await fetchExchangeRates();
console.log(convertCurrency(100, "USD", "EUR"));
```
