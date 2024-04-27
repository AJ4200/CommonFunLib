const express = require("express");
const router = express.Router();
const Generator = require("../Lib/Generator");

const generator = new Generator();

router.get("/randomName", (req, res) => {
  const randomName = generator.generateRandomName();
  res.json({ randomName });
});

router.get("/randomPassword", (req, res) => {
  const { length } = req.query;
  const passwordLength = length ? parseInt(length) : 12; // Default length is 12 if not provided
  const randomPassword = generator.generatePassword(passwordLength);
  res.json({ randomPassword });
});

router.get("/firstNames", (req, res) => {
  const firstNames = generator.getFirstNames();
  res.json({ firstNames });
});

router.get("/lastNames", (req, res) => {
  const lastNames = generator.getLastNames();
  res.json({ lastNames });
});

module.exports = router;
