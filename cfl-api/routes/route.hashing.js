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

router.post("/sha384", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.sha384(input);
  res.json({ hashedValue });
});

router.post("/sha512", (req, res) => {
  const { input } = req.body;
  const hashedValue = Hashing.sha512(input);
  res.json({ hashedValue });
});


router.post("/base64Encode", (req, res) => {
  const { input } = req.body;
  res.json({ encodedValue: Hashing.base64Encode(input) });
});

router.post("/base64Decode", (req, res) => {
  const { input } = req.body;
  res.json({ decodedValue: Hashing.base64Decode(input) });
});

router.post("/hmacSha256", (req, res) => {
  const { input, secret } = req.body;
  res.json({ hashedValue: Hashing.hmacSha256(input, secret) });
});

module.exports = router;
