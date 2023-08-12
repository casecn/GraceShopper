/* eslint-disable */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

module.exports = app;
