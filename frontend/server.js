/* eslint-env node */
const path = require("path");
const express = require("express");

const app = express();

const distDir = path.resolve(__dirname, "dist");

app.use("/dist", express.static(distDir));
app.listen(3005);
