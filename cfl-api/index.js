const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const startedAt = Date.now();
const PORT = process.env.PORT || 3001;

// Importing routes
 const converterRoutes = require("./routes/route.converter");
 const generatorRoutes = require("./routes/route.generator");
 const hashingRoutes = require("./routes/route.hashing");
const commonFunctionsRoutes = require("./routes/route.commonfunctions");

// Using the imported routes
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
