(function() {
  'use strict';

  var MODULE_NAME = 'awesome.module.seed';

  angular.module(MODULE_NAME)
         .controller('seedHomeController', seedHomeController);

   function seedHomeController() {
     this.message = 'Seed home!';
    }
})();
