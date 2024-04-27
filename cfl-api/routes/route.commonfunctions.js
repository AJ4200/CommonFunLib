const express = require("express");
const router = express.Router();
const CommonFunctions = require("../Lib/CommonFunctions");

router.get("/even", (req, res) => {
  const { num } = req.query;
  const isEven = CommonFunctions.isEven(parseInt(num));
  res.json({ isEven });
});

router.get("/odd", (req, res) => {
  const { num } = req.query;
  const isOdd = CommonFunctions.isOdd(parseInt(num));
  res.json({ isOdd });
});

router.get("/factorial", (req, res) => {
  const { num } = req.query;
  const factorial = CommonFunctions.factorial(parseInt(num));
  res.json({ factorial });
});

router.get("/gcd", (req, res) => {
  const { a, b } = req.query;
  const gcd = CommonFunctions.gcd(parseInt(a), parseInt(b));
  res.json({ gcd });
});

router.get("/lcm", (req, res) => {
  const { a, b } = req.query;
  const lcm = CommonFunctions.lcm(parseInt(a), parseInt(b));
  res.json({ lcm });
});

router.get("/prime", (req, res) => {
  const { num } = req.query;
  const isPrime = CommonFunctions.isPrime(parseInt(num));
  res.json({ isPrime });
});

router.get("/reverse", (req, res) => {
  const { str } = req.query;
  const reversedString = CommonFunctions.reverseString(str);
  res.json({ reversedString });
});

module.exports = router;
