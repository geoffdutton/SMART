/* eslint-env node */
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

const distDir = path.resolve(__dirname, "dist");
console.log("starting static server");
app.use("/static", cors({ origin: "*" }), express.static(distDir));
app.listen(3005, () => {
    console.log("static server listening on port 3005");
});
