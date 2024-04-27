const express = require('express');
const Converter = require('./Lib/Converter');
const Generator = require('./Lib/Generator');
const Hashing = require('./Lib/Hashing');
const CommonFunctions = require('./Lib/CommonFunctions');

const app = express();
app.use(express.json());

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Create an instance of the Converter class
const converter = new Converter();

// Create an instance of the Generator class
const generator = new Generator();

app.get('/convert/currency', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.query;

  // Fetch exchange rates before converting currency
  await converter.fetchExchangeRates();

  const convertedAmount = converter.convertCurrency(parseFloat(amount), fromCurrency, toCurrency);

  if (convertedAmount !== null) {
    res.json({ result: convertedAmount });
  } else {
    res.status(400).json({ error: 'Invalid currency specified.' });
  }
});

app.get('/convert/length', (req, res) => {
  const { length, fromUnit, toUnit } = req.query;
  const convertedLength = converter.convertLength(parseFloat(length), fromUnit, toUnit);

  if (convertedLength !== null) {
    res.json({ result: convertedLength });
  } else {
    res.status(400).json({ error: 'Invalid unit specified.' });
  }
});

app.get('/convert/weight', (req, res) => {
  const { weight, fromUnit, toUnit } = req.query;
  const convertedWeight = converter.convertWeight(parseFloat(weight), fromUnit, toUnit);

  if (convertedWeight !== null) {
    res.json({ result: convertedWeight });
  } else {
    res.status(400).json({ error: 'Invalid unit specified.' });
  }
});

app.get('/convert/temperature', (req, res) => {
  const { temperature, fromUnit, toUnit } = req.query;
  const convertedTemperature = converter.convertTemperature(parseFloat(temperature), fromUnit, toUnit);

  if (convertedTemperature !== null) {
    res.json({ result: convertedTemperature });
  } else {
    res.status(400).json({ error: 'Invalid temperature unit specified.' });
  }
});

app.get('/generate/name', (req, res) => {
  const randomName = generator.generateRandomName();
  res.json({ name: randomName });
});

app.get('/generate/number', (req, res) => {
  const { min, max } = req.query;
  const randomNumber = generator.generateRandomNumber(min,max);
  res.json({ randomNumber: randomNumber });
});

app.get('/generate/password', (req, res) => {
  const { length } = req.query;
  const pass = generator.generatePassword(length);
  res.json({ password: pass });
});

app.get('/hash/md5', (req, res) => {
  const { input } = req.query;
  const hashedValue = Hashing.md5(input);
  res.json({ hash: hashedValue });
});

app.get('/hash/sha1', (req, res) => {
  const { input } = req.query;
  const hashedValue = Hashing.sha1(input);
  res.json({ hash: hashedValue });
});

app.get('/hash/sha256', (req, res) => {
  const { input } = req.query;
  const hashedValue = Hashing.sha256(input);
  res.json({ hash: hashedValue });
});

app.get('/hash/sha512', (req, res) => {
  const { input } = req.query;
  const hashedValue = Hashing.sha512(input);
  res.json({ hash: hashedValue });
});

// Custom endpoints using CommonFunctions

app.get('/common/even', (req, res) => {
  const { num } = req.query;
  const isEven = CommonFunctions.isEven(parseInt(num));

  res.json({ isEven });
});

app.get('/common/odd', (req, res) => {
  const { num } = req.query;
  const isOdd = CommonFunctions.isOdd(parseInt(num));

  res.json({ isOdd });
});

app.get('/common/factorial', (req, res) => {
  const { num } = req.query;
  const factorial = CommonFunctions.factorial(parseInt(num));

  res.json({ factorial });
});

app.get('/common/gcd', (req, res) => {
  const { a, b } = req.query;
  const gcd = CommonFunctions.gcd(parseInt(a), parseInt(b));

  res.json({ gcd });
});

app.get('/common/lcm', (req, res) => {
  const { a, b } = req.query;
  const lcm = CommonFunctions.lcm(parseInt(a), parseInt(b));

  res.json({ lcm });
});

app.get('/common/prime', (req, res) => {
  const { num } = req.query;
  const isPrime = CommonFunctions.isPrime(parseInt(num));

  res.json({ isPrime });
});

app.get('/common/reverse', (req, res) => {
  const { str } = req.query;
  const reversedString = CommonFunctions.reverseString(str);

  res.json({ reversedString });
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});
