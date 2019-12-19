const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const { MODULE_NAME } = require('./backend/lib/constants');

const awesomeModule = new AwesomeModule(MODULE_NAME, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.esn-config', 'esn-config'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.domain', 'domain'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.passport', 'passport'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.auth', 'auth'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.helpers', 'helpers'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.user', 'user'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.i18n', 'i18n')
  ],

  states: {
    lib: function(dependencies, callback) {
      const lib = require('./backend/lib')(dependencies);
      const module = require('./backend/webserver/api')(dependencies, lib);

      callback(null, {
        api: { module },
        lib
      });
    },

    deploy: function(dependencies, callback) {
      const app = require('./backend/webserver/application')(dependencies, this);
      const webserverWrapper = dependencies('webserver-wrapper');

      app.use(this.api.module);
      webserverWrapper.addApp(MODULE_NAME, app);

      callback();
    },

    start: function(dependencies, callback) {
      this.lib.init();
      callback();
    }
  }
});

module.exports = awesomeModule;
