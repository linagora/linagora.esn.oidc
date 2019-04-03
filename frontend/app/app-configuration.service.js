(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.seed';

  angular.module(MODULE_NAME).factory('seedConfiguration', seedConfiguration);

  function seedConfiguration(esnConfig) {

    return {
      get: get
    };

    function get(key, defaultValue) {
      return esnConfig('core.modules.' + MODULE_NAME + '.' + key, defaultValue);
    }
  }
})(angular);
