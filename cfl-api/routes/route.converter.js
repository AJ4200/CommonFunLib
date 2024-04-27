const express = require("express");
const router = express.Router();
const Converter = require("../lib/Converter");

const converter = new Converter();

// Fetch exchange rates on server startup
converter.fetchExchangeRates();

router.post("/currency", (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  const convertedAmount = converter.convertCurrency(
    amount,
    fromCurrency,
    toCurrency
  );
  res.json({ convertedAmount });
});

router.post("/length", (req, res) => {
  const { length, fromUnit, toUnit } = req.body;
  const convertedLength = converter.convertLength(length, fromUnit, toUnit);
  res.json({ convertedLength });
});

router.post("/weight", (req, res) => {
  const { weight, fromUnit, toUnit } = req.body;
  const convertedWeight = converter.convertWeight(weight, fromUnit, toUnit);
  res.json({ convertedWeight });
});

router.post("/temperature", (req, res) => {
  const { temperature, fromUnit, toUnit } = req.body;
  const convertedTemperature = converter.convertTemperature(
    temperature,
    fromUnit,
    toUnit
  );
  res.json({ convertedTemperature });
});

router.post("/lengthSystem", (req, res) => {
  const { value, fromSystem, toSystem } = req.body;
  const convertedValue = converter.convertLengthSystem(
    value,
    fromSystem,
    toSystem
  );
  res.json({ convertedValue });
});

module.exports = router;
