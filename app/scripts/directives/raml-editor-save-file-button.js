(function() {
  'use strict';

  function ramlEditorSaveFileButton($rootScope) {
    return {
      restrict: 'E',
      template: '<span role="save-button" ng-click="saveFile()">Save</span>',
      link: function(scope) {
        scope.saveFile = function() {
          var file = scope.fileBrowser.selectedFile;

          file.save().then(function success() {
            $rootScope.$broadcast('event:notification', {
              message: 'File saved.',
              expires: true
            });
          });
        };
      }
    };
  }

  angular.module('ramlEditorApp').directive('ramlEditorSaveFileButton', ramlEditorSaveFileButton);
})();
