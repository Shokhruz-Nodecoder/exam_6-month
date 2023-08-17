const routes = require("../api/routes")
const cors = require("cors");
const express = require("express");

const modules = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);
};

module.exports = modules;
