#!/usr/bin/env node

const express = require("express");
const cors = require("cors");

const converterRoutes = require("./routes/route.converter");
const generatorRoutes = require("./routes/route.generator");
const hashingRoutes = require("./routes/route.hashing");
const commonFunctionsRoutes = require("./routes/route.commonfunctions");

const app = express();
const startedAt = Date.now();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/convert", converterRoutes);
app.use("/generate", generatorRoutes);
app.use("/hash", hashingRoutes);
app.use("/common", commonFunctionsRoutes);

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    service: "commonfunlib-api",
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
