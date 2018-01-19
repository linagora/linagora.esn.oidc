(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.seed';
  var MODULE_PREFIX = 'seed';

  angular.module(MODULE_NAME)
    .config(seedApplicationMenu);

  function seedApplicationMenu(dynamicDirectiveServiceProvider) {
    var home = new dynamicDirectiveServiceProvider.DynamicDirective(true, MODULE_PREFIX + '-application-menu');

    dynamicDirectiveServiceProvider.addInjection('esn-application-menu', home);
  }
})();
