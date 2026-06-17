const express = require("express");
const router = express.Router();
const CommonFunctions = require("../Lib/CommonFunctions");

const numberParam = (value) => Number(value);

const ensureFinite = (res, values) => {
  if (values.some((value) => !Number.isFinite(value))) {
    res.status(400).json({ error: "Expected numeric query parameters." });
    return false;
  }
  return true;
};

router.get("/even", (req, res) => {
  const num = numberParam(req.query.num);
  if (!ensureFinite(res, [num])) return;
  res.json({ isEven: CommonFunctions.isEven(num) });
});

router.get("/odd", (req, res) => {
  const num = numberParam(req.query.num);
  if (!ensureFinite(res, [num])) return;
  res.json({ isOdd: CommonFunctions.isOdd(num) });
});

router.get("/factorial", (req, res) => {
  const num = numberParam(req.query.num);
  if (!ensureFinite(res, [num])) return;
  res.json({ factorial: CommonFunctions.factorial(num) });
});

router.get("/gcd", (req, res) => {
  const a = numberParam(req.query.a);
  const b = numberParam(req.query.b);
  if (!ensureFinite(res, [a, b])) return;
  res.json({ gcd: CommonFunctions.gcd(a, b) });
});

router.get("/lcm", (req, res) => {
  const a = numberParam(req.query.a);
  const b = numberParam(req.query.b);
  if (!ensureFinite(res, [a, b])) return;
  res.json({ lcm: CommonFunctions.lcm(a, b) });
});

router.get("/prime", (req, res) => {
  const num = numberParam(req.query.num);
  if (!ensureFinite(res, [num])) return;
  res.json({ isPrime: CommonFunctions.isPrime(num) });
});

router.get("/reverse", (req, res) => {
  res.json({ reversedString: CommonFunctions.reverseString(req.query.str || "") });
});

router.get("/palindrome", (req, res) => {
  res.json({ isPalindrome: CommonFunctions.isPalindrome(req.query.str || "") });
});

router.get("/slugify", (req, res) => {
  res.json({ slug: CommonFunctions.slugify(req.query.str || "") });
});

router.get("/clamp", (req, res) => {
  const num = numberParam(req.query.num);
  const min = numberParam(req.query.min);
  const max = numberParam(req.query.max);
  if (!ensureFinite(res, [num, min, max])) return;
  res.json({ clamped: CommonFunctions.clamp(num, min, max) });
});

router.get("/percentage", (req, res) => {
  const part = numberParam(req.query.part);
  const total = numberParam(req.query.total);
  if (!ensureFinite(res, [part, total])) return;
  res.json({ percentage: CommonFunctions.percentage(part, total) });
});

module.exports = router;
