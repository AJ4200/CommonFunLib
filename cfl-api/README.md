# CommonFunLib

CommonFunLib is a small Node utility package for everyday helpers: number and
string checks, random data generation, unit conversion, hashing, Base64, and
HMAC signing.

It can also run the same utilities as an Express API.

## Install

```sh
npm install commonfunlib
```

## Use As A Package

```js
import {
  isEven,
  slugify,
  generatePassword,
  convertLength,
  sha256,
} from "commonfunlib";

console.log(isEven(42));
console.log(slugify("My New Tool"));
console.log(generatePassword(16));
console.log(convertLength(12, "m", "foot"));
console.log(sha256("CommonFunLib"));
```

Grouped helpers are also available:

```js
import { common, generate, convert, hash } from "commonfunlib";

common.isPrime(17);
generate.uuid();
convert.temperature(22, "C", "F");
hash.base64Encode("hello");
```

If you prefer classes:

```js
const { Converter, Generator, Hashing, CommonFunctions } = require("commonfunlib");

const converter = new Converter();
const generator = new Generator();

converter.convertWeight(5, "kg", "lb");
generator.generatePin(6);
Hashing.hmacSha256("payload", "secret");
CommonFunctions.percentage(25, 200);
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
