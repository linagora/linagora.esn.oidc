(function() {
  'use strict';

  var MODULE_NAME = 'awesome.module.seed';

  angular.module(MODULE_NAME, [
    'ui.router',
    'op.dynamicDirective',
    'restangular',
    'pascalprecht.translate'
  ]);
})();
