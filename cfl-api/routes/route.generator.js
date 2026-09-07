const express = require("express");
const multer = require("multer");
const router = express.Router();
const Generator = require("../Lib/Generator");

const generator = new Generator();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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

router.get("/randomNumber", (req, res) => {
  const min = req.query.min ? parseInt(req.query.min) : 1;
  const max = req.query.max ? parseInt(req.query.max) : 100;
  res.json({ randomNumber: generator.generateRandomNumber(min, max) });
});

router.get("/firstNames", (req, res) => {
  const firstNames = generator.getFirstNames();
  res.json({ firstNames });
});

router.get("/lastNames", (req, res) => {
  const lastNames = generator.getLastNames();
  res.json({ lastNames });
});


router.get("/uuid", (req, res) => {
  res.json({ uuid: generator.generateUuid() });
});

router.get("/token", (req, res) => {
  const bytes = req.query.bytes ? parseInt(req.query.bytes) : 16;
  res.json({ token: generator.generateToken(bytes) });
});

router.get("/pin", (req, res) => {
  const digits = req.query.digits ? parseInt(req.query.digits) : 6;
  res.json({ pin: generator.generatePin(digits) });
});

router.get("/color", (req, res) => {
  res.json({ color: generator.generateColor() });
});

router.get("/lorem", (req, res) => {
  const words = req.query.words ? parseInt(req.query.words) : 24;
  res.json({ lorem: generator.generateLorem(words) });
});

router.get("/nanoid", (req, res) => {
  const length = req.query.length ? parseInt(req.query.length) : 21;
  res.json({ nanoid: generator.generateNanoId(length) });
});

router.get("/apiKey", (req, res) => {
  const bytes = req.query.bytes ? parseInt(req.query.bytes) : 24;
  res.json({ apiKey: generator.generateApiKey(req.query.prefix || "cfl", bytes) });
});

router.get("/macAddress", (req, res) => {
  res.json({ macAddress: generator.generateMacAddress() });
});

router.get("/semver", (req, res) => {
  const major = req.query.major ? parseInt(req.query.major) : 0;
  res.json({ semver: generator.generateSemver(major) });
});

router.get("/timestamp", (req, res) => {
  res.json({ timestamp: generator.generateTimestamp(req.query.format || "iso") });
});

router.get("/randomDate", (req, res) => {
  try {
    res.json({ randomDate: generator.generateRandomDate(req.query.start, req.query.end) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/username", (req, res) => {
  res.json({ username: generator.generateUsername() });
});

router.get("/boolean", (req, res) => {
  res.json({ boolean: generator.generateBoolean() });
});

router.get("/qrCode", async (req, res) => {
  try {
    const qrCode = await generator.generateQrCode(req.query.value, {
      margin: req.query.margin,
      width: req.query.width,
    });
    res.json({ qrCode });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/steganopass", (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      return res.status(413).json({ error: "SteganoPass only accepts files up to 5 MB." });
    }
    next();
  });
}, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "A file is required." });
    }

    res.json({ steganopass: generator.generateSteganoPass(req.file.buffer, req.file.originalname) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
