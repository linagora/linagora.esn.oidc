(function() {
  'use strict';

  var MODULE_NAME = 'linagora.esn.seed';
  var MODULE_DIR_NAME = '/linagora.esn.seed';

  angular.module(MODULE_NAME)

    .config(function($stateProvider) {
      $stateProvider
        .state('example', {
          url: '/example',
          views: {
            '': {
              templateUrl: MODULE_DIR_NAME + '/app/home/seed-home.html'
            },
            'sidebar@example': {
              templateUrl: MODULE_DIR_NAME + '/app/home/seed-sidebar.html'
            }
          },
          deepStateRedirect: {
            default: 'example.home',
            fn: function() {
              return { state: 'example.home' };
            }
          },
          resolve: {
            isModuleActive: isModuleActive
          }
        })
        .state('example.home', {
          url: '/home',
          controller: 'seedHomeController',
          controllerAs: 'ctrl',
          views: {
            'main@example': {
              templateUrl: MODULE_DIR_NAME + '/app/home/seed-main.html'
            }
          }
        });

        function isModuleActive($location, seedConfiguration) {
          return seedConfiguration.get('enabled', true).then(function(isEnabled) {
            if (!isEnabled) {
              $location.path('/');
            }
          }).catch(function() {
            $location.path('/');
          });
        }
    });
})();
