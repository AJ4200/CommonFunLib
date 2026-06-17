const CommonFunctions = require("./Lib/CommonFunctions");
const Generator = require("./Lib/Generator");
const Converter = require("./Lib/Converter");
const Hashing = require("./Lib/Hashing");

const generator = new Generator();
const converter = new Converter();

const common = {
  isEven: CommonFunctions.isEven,
  isOdd: CommonFunctions.isOdd,
  factorial: CommonFunctions.factorial,
  gcd: CommonFunctions.gcd,
  lcm: CommonFunctions.lcm,
  isPrime: CommonFunctions.isPrime,
  swapVariableValue: CommonFunctions.swapVariableValue,
  reverseString: CommonFunctions.reverseString,
  isPalindrome: CommonFunctions.isPalindrome,
  slugify: CommonFunctions.slugify,
  clamp: CommonFunctions.clamp,
  percentage: CommonFunctions.percentage,
};

const generate = {
  randomNumber: (min = 1, max = 100) => generator.generateRandomNumber(min, max),
  randomName: () => generator.generateRandomName(),
  firstNames: () => generator.getFirstNames(),
  lastNames: () => generator.getLastNames(),
  password: (length = 12) => generator.generatePassword(length),
  uuid: () => generator.generateUuid(),
  token: (bytes = 16) => generator.generateToken(bytes),
  pin: (digits = 6) => generator.generatePin(digits),
  color: () => generator.generateColor(),
  lorem: (words = 24) => generator.generateLorem(words),
};

const convert = {
  fetchExchangeRates: () => converter.fetchExchangeRates(),
  currency: (amount, fromCurrency, toCurrency) =>
    converter.convertCurrency(amount, fromCurrency, toCurrency),
  length: (length, fromUnit, toUnit) => converter.convertLength(length, fromUnit, toUnit),
  weight: (weight, fromUnit, toUnit) => converter.convertWeight(weight, fromUnit, toUnit),
  area: (area, fromUnit, toUnit) => converter.convertArea(area, fromUnit, toUnit),
  dataSize: (value, fromUnit, toUnit) => converter.convertDataSize(value, fromUnit, toUnit),
  speed: (value, fromUnit, toUnit) => converter.convertSpeed(value, fromUnit, toUnit),
  temperature: (temperature, fromUnit, toUnit) =>
    converter.convertTemperature(temperature, fromUnit, toUnit),
  lengthSystem: (value, fromSystem, toSystem) =>
    converter.convertLengthSystem(value, fromSystem, toSystem),
};

const hash = {
  md5: Hashing.md5,
  sha1: Hashing.sha1,
  sha256: Hashing.sha256,
  sha384: Hashing.sha384,
  sha512: Hashing.sha512,
  base64Encode: Hashing.base64Encode,
  base64Decode: Hashing.base64Decode,
  hmacSha256: Hashing.hmacSha256,
};

const api = {
  CommonFunctions,
  Generator,
  Converter,
  Hashing,
  common,
  generate,
  convert,
  hash,
  isEven: common.isEven,
  isOdd: common.isOdd,
  factorial: common.factorial,
  gcd: common.gcd,
  lcm: common.lcm,
  isPrime: common.isPrime,
  swapVariableValue: common.swapVariableValue,
  reverseString: common.reverseString,
  isPalindrome: common.isPalindrome,
  slugify: common.slugify,
  clamp: common.clamp,
  percentage: common.percentage,
  generateRandomNumber: generate.randomNumber,
  generateRandomName: generate.randomName,
  getFirstNames: generate.firstNames,
  getLastNames: generate.lastNames,
  generatePassword: generate.password,
  generateUuid: generate.uuid,
  generateToken: generate.token,
  generatePin: generate.pin,
  generateColor: generate.color,
  generateLorem: generate.lorem,
  fetchExchangeRates: convert.fetchExchangeRates,
  convertCurrency: convert.currency,
  convertLength: convert.length,
  convertWeight: convert.weight,
  convertArea: convert.area,
  convertDataSize: convert.dataSize,
  convertSpeed: convert.speed,
  convertTemperature: convert.temperature,
  convertLengthSystem: convert.lengthSystem,
  md5: hash.md5,
  sha1: hash.sha1,
  sha256: hash.sha256,
  sha384: hash.sha384,
  sha512: hash.sha512,
  base64Encode: hash.base64Encode,
  base64Decode: hash.base64Decode,
  hmacSha256: hash.hmacSha256,
};

module.exports = api;
module.exports.default = api;
