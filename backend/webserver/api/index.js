const express = require('express');

module.exports = (dependencies, lib) => {
  const router = express.Router();

  require('./callback')(dependencies, lib, router);

  return router;
};
