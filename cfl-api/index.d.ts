export class CommonFunctions {
  static isEven(num: number): boolean;
  static isOdd(num: number): boolean;
  static factorial(num: number): number;
  static gcd(a: number, b: number): number;
  static lcm(a: number, b: number): number;
  static isPrime(num: number): boolean;
  static swapVariableValue<T>(arr: T[], i: number, j: number): void;
  static reverseString(str: unknown): string;
  static isPalindrome(str: unknown): boolean;
  static slugify(str: unknown): string;
  static clamp(num: number, min: number, max: number): number;
  static percentage(part: number, total: number): number | null;
}

export class Generator {
  firstNames: string[];
  lastNames: string[];
  generateRandomNumber(min: number, max: number): number;
  generateRandomName(): string;
  getFirstNames(): string[];
  getLastNames(): string[];
  generatePassword(length: number): string;
  generateUuid(): string;
  generateToken(bytes?: number): string;
  generatePin(digits?: number): string;
  generateColor(): string;
  generateLorem(words?: number): string;
}

export class Converter {
  apiKey?: string;
  exchangeRates: Record<string, number>;
  fetchExchangeRates(): Promise<void>;
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): string | null;
  convertLength(length: number, fromUnit: string, toUnit: string): string | null;
  convertWeight(weight: number, fromUnit: string, toUnit: string): string | null;
  convertArea(area: number, fromUnit: string, toUnit: string): string | null;
  convertDataSize(value: number, fromUnit: string, toUnit: string): string | null;
  convertSpeed(value: number, fromUnit: string, toUnit: string): string | null;
  convertTemperature(temperature: number, fromUnit: string, toUnit: string): string | null;
  convertLengthSystem(value: number, fromSystem: string, toSystem: string): string | null;
}

export class Hashing {
  static md5(input: string): string;
  static sha1(input: string): string;
  static sha256(input: string): string;
  static sha384(input: string): string;
  static sha512(input: string): string;
  static base64Encode(input: string): string;
  static base64Decode(input: string): string;
  static hmacSha256(input: string, secret: string): string;
}

export const common: {
  isEven: typeof CommonFunctions.isEven;
  isOdd: typeof CommonFunctions.isOdd;
  factorial: typeof CommonFunctions.factorial;
  gcd: typeof CommonFunctions.gcd;
  lcm: typeof CommonFunctions.lcm;
  isPrime: typeof CommonFunctions.isPrime;
  swapVariableValue: typeof CommonFunctions.swapVariableValue;
  reverseString: typeof CommonFunctions.reverseString;
  isPalindrome: typeof CommonFunctions.isPalindrome;
  slugify: typeof CommonFunctions.slugify;
  clamp: typeof CommonFunctions.clamp;
  percentage: typeof CommonFunctions.percentage;
};

export const generate: {
  randomNumber(min?: number, max?: number): number;
  randomName(): string;
  firstNames(): string[];
  lastNames(): string[];
  password(length?: number): string;
  uuid(): string;
  token(bytes?: number): string;
  pin(digits?: number): string;
  color(): string;
  lorem(words?: number): string;
};

export const convert: {
  fetchExchangeRates(): Promise<void>;
  currency(amount: number, fromCurrency: string, toCurrency: string): string | null;
  length(length: number, fromUnit: string, toUnit: string): string | null;
  weight(weight: number, fromUnit: string, toUnit: string): string | null;
  area(area: number, fromUnit: string, toUnit: string): string | null;
  dataSize(value: number, fromUnit: string, toUnit: string): string | null;
  speed(value: number, fromUnit: string, toUnit: string): string | null;
  temperature(temperature: number, fromUnit: string, toUnit: string): string | null;
  lengthSystem(value: number, fromSystem: string, toSystem: string): string | null;
};

export const hash: {
  md5: typeof Hashing.md5;
  sha1: typeof Hashing.sha1;
  sha256: typeof Hashing.sha256;
  sha384: typeof Hashing.sha384;
  sha512: typeof Hashing.sha512;
  base64Encode: typeof Hashing.base64Encode;
  base64Decode: typeof Hashing.base64Decode;
  hmacSha256: typeof Hashing.hmacSha256;
};

export const isEven: typeof CommonFunctions.isEven;
export const isOdd: typeof CommonFunctions.isOdd;
export const factorial: typeof CommonFunctions.factorial;
export const gcd: typeof CommonFunctions.gcd;
export const lcm: typeof CommonFunctions.lcm;
export const isPrime: typeof CommonFunctions.isPrime;
export const swapVariableValue: typeof CommonFunctions.swapVariableValue;
export const reverseString: typeof CommonFunctions.reverseString;
export const isPalindrome: typeof CommonFunctions.isPalindrome;
export const slugify: typeof CommonFunctions.slugify;
export const clamp: typeof CommonFunctions.clamp;
export const percentage: typeof CommonFunctions.percentage;

export const generateRandomNumber: typeof generate.randomNumber;
export const generateRandomName: typeof generate.randomName;
export const getFirstNames: typeof generate.firstNames;
export const getLastNames: typeof generate.lastNames;
export const generatePassword: typeof generate.password;
export const generateUuid: typeof generate.uuid;
export const generateToken: typeof generate.token;
export const generatePin: typeof generate.pin;
export const generateColor: typeof generate.color;
export const generateLorem: typeof generate.lorem;

export const fetchExchangeRates: typeof convert.fetchExchangeRates;
export const convertCurrency: typeof convert.currency;
export const convertLength: typeof convert.length;
export const convertWeight: typeof convert.weight;
export const convertArea: typeof convert.area;
export const convertDataSize: typeof convert.dataSize;
export const convertSpeed: typeof convert.speed;
export const convertTemperature: typeof convert.temperature;
export const convertLengthSystem: typeof convert.lengthSystem;

export const md5: typeof Hashing.md5;
export const sha1: typeof Hashing.sha1;
export const sha256: typeof Hashing.sha256;
export const sha384: typeof Hashing.sha384;
export const sha512: typeof Hashing.sha512;
export const base64Encode: typeof Hashing.base64Encode;
export const base64Decode: typeof Hashing.base64Decode;
export const hmacSha256: typeof Hashing.hmacSha256;
