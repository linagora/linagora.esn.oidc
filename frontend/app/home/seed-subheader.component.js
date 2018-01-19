(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.seed';
  var MODULE_DIR_NAME = '/linagora.esn.seed';

  angular.module(MODULE_NAME)
         .component('seedSubheader', seedSubheader());

  function seedSubheader() {
    var component = {
      templateUrl: MODULE_DIR_NAME + '/app/home/seed-subheader.html'
    };

    return component;
  }

})();
