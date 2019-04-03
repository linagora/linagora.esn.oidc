(function(angular) {
  'use strict';

  var MODULE_NAME = 'linagora.esn.seed';

  angular.module(MODULE_NAME).run(runBlock);

    function runBlock(
      esnModuleRegistry,
      SEED_MODULE_METADATA
    ) {
      esnModuleRegistry.add(SEED_MODULE_METADATA);
    }
})(angular);
