'use strict';

module.exports = function(dependencies, lib, router) {
  const authorizationMW = dependencies('authorizationMW');
  const controller = require('./controller')(dependencies, lib);
  const middleware = require('./middleware')(dependencies, lib);

  router.get('/example',
    authorizationMW.requiresAPILogin,
    middleware.canGet,
    controller.get);
};
