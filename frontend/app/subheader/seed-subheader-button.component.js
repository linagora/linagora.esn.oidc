'use strict';

var MODULE_NAME = 'awesome.module.seed';
var MODULE_DIR_NAME = '/awesome.module.seed';

angular.module(MODULE_NAME)

  .component('seedSubheaderButton', {
    templateUrl: MODULE_DIR_NAME + '/app/subheader/seed-subheader-button.html',
    bindings: {
      seedDisabled: '<?',
      seedClick: '&?',
      seedIconClass: '@?',
      seedIconText: '@?',
      seedIconPosition: '@?'
    },
    controllerAs: 'ctrl'
  });
