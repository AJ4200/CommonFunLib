const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Importing routes
 const converterRoutes = require("./routes/converter");
 const generatorRoutes = require("./routes/route.generator");
 const hashingRoutes = require("./routes/hashing");
const commonFunctionsRoutes = require("./routes/route.commonfunctions");

// Using the imported routes
 app.use("/convert", converterRoutes);
 app.use("/generate", generatorRoutes);
 app.use("/hash", hashingRoutes);
app.use("/common", commonFunctionsRoutes);

app.listen(3001, () => {
  console.log("API server is running on port 3001");
});
