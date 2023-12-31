const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const routes = require("../api/routes")
const relations = require("../models/associate")
const fileupload = require("express-fileupload")

const modules = async (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookie())
  app.use(fileupload())
  app.use(routes);
  relations()
};

module.exports = modules;
