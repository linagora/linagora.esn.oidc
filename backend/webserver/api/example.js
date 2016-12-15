'use strict';

module.exports = function(dependencies, lib, router) {

  const authorizationMW = dependencies('authorizationMW');
  const exampleController = require('../controllers/example')(dependencies, lib);

  router.get('/example', authorizationMW.requiresAPILogin, exampleController.example);
};
