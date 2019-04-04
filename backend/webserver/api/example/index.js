'use strict';

module.exports = function(dependencies, lib, router, moduleName) {
  const authorizationMW = dependencies('authorizationMW');
  const controller = require('./controller')(dependencies, lib);
  const middleware = require('./middleware')(dependencies, lib);
  const moduleMW = dependencies('moduleMW');

  router.all('/example*',
    authorizationMW.requiresAPILogin,
    moduleMW.requiresModuleIsEnabledInCurrentDomain(moduleName)
  );

  router.get('/example',
    middleware.canGet,
    controller.get);
};
