'use strict';

const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const path = require('path');
const glob = require('glob-all');
const FRONTEND_JS_PATH = __dirname + '/frontend/app/';
const MODULE_NAME = 'awesome.module.seed';
const MODULE_PREFIX = 'seed';

const myAwesomeModule = new AwesomeModule(MODULE_NAME, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.db', 'db'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.authorization', 'authorizationMW')
  ],

  states: {
    lib: function(dependencies, callback) {
      const moduleLib = require('./backend/lib')(dependencies);
      const module = require('./backend/webserver/api')(dependencies, moduleLib);

      const lib = {
        api: {
          module: module
        },
        lib: moduleLib
      };

      return callback(null, lib);
    },

    deploy: function(dependencies, callback) {
      // Register the webapp
      const app = require('./backend/webserver/application')(dependencies, this);
      // Register every exposed endpoints
      app.use('/api', this.api.module);

      const webserverWrapper = dependencies('webserver-wrapper');
      // Register every exposed frontend scripts
      const jsFiles = glob.sync([
        FRONTEND_JS_PATH + MODULE_PREFIX + '.app.js',
        FRONTEND_JS_PATH + '*.js',
        FRONTEND_JS_PATH + '*/!(*spec).js',
        FRONTEND_JS_PATH + '**/*/!(*spec).js'
      ]).map(function(filepath) {
        return filepath.replace(FRONTEND_JS_PATH, '');
      });
      webserverWrapper.injectAngularAppModules(MODULE_NAME, jsFiles, [MODULE_NAME], ['esn']);
      const lessFile = path.resolve(__dirname, `./frontend/app/${MODULE_PREFIX}.styles.less`);
      webserverWrapper.injectLess(MODULE_NAME, [lessFile], 'esn');
      const jsResourceFiles = [
        "../components/angular-translate/angular-translate.min.js",
        "../components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js"
      ];
      webserverWrapper.injectJS(MODULE_NAME, jsResourceFiles, 'esn');
      webserverWrapper.addApp(MODULE_NAME, app);

      return callback();
    }
  }
});

/**
 * The main AwesomeModule describing the application.
 * @type {AwesomeModule}
 */
module.exports = myAwesomeModule;
