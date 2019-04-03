'use strict';

const express = require('express');

module.exports = function(dependencies, lib) {

  const router = express.Router();
  const moduleName = 'linagora.esn.seed';

  require('./example')(dependencies, lib, router, moduleName);

  return router;
};
