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

app.use(express.json({ limit: "1mb" }));
app.use(cors());

const routes = {
  status: "/status",
  convert: "/convert",
  generate: "/generate",
  hash: "/hash",
  common: "/common",
};

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "commonfunlib-api",
    description:
      "Common utility functions for generating data, converting values, hashing text, and everyday number/string helpers.",
    routes,
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
});

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

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    error: "not_found",
    message: `No CommonFunLib API route exists for ${req.method} ${req.path}.`,
    routes,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    error: "internal_server_error",
    message: "CommonFunLib API hit an unexpected error.",
  });
});

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
