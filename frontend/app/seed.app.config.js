(function() {
  'use strict';

  var MODULE_NAME = 'awesome.module.seed';
  var MODULE_PREFIX = 'seed';

  angular.module(MODULE_NAME)
    .config(seedApplicationMenu)
    .config(translateProviderConfigure);

  ////////////////
  function seedApplicationMenu(dynamicDirectiveServiceProvider) {
    var home = new dynamicDirectiveServiceProvider.DynamicDirective(true, MODULE_PREFIX + '-application-menu');

    dynamicDirectiveServiceProvider.addInjection('esn-application-menu', home);
  }

  function translateProviderConfigure($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      files: [{
        prefix: './' + MODULE_NAME + '/app/locales/web-',
        suffix: '.json'
      }]
    });
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy('escape');
  }
})();
