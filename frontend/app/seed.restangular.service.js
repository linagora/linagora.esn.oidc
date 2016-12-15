(function() {
  'use strict';

  var MODULE_NAME = 'awesome.module.seed';
  var MODULE_DIR_NAME = '/awesome.module.seed';

  angular.module(MODULE_NAME)
    .factory('seedRestangular', seedRestangular);

  function seedRestangular(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(MODULE_DIR_NAME + '/api');
      RestangularConfigurer.setFullResponse(true);
    });
  }
})();
