const express = require("express");
const router = express.Router();
const Hashing = require("../Lib/Hashing");

router.post("/md5", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.md5(input);
  res.json({ hashedValue });
});

router.post("/sha1", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.sha1(input);
  res.json({ hashedValue });
});

router.post("/sha256", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.sha256(input);
  res.json({ hashedValue });
});

router.post("/sha512", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.sha512(input);
  res.json({ hashedValue });
});

module.exports = router;
