describe('ramlEditorSaveFileButton', function() {
  'use strict';

  var scope, el, sandbox;

  function compileSaveFileButton() {
    el = compileTemplate('<raml-editor-save-file-button></raml-editor-save-file-button>', scope);
  }

  function clickSaveFileButton() {
    angular.element(el[0].querySelector('[role="save-button"]')).triggerHandler('click');
  }

  beforeEach(module('ramlEditorApp'));

  beforeEach(inject(function($rootScope) {
    sandbox = sinon.sandbox.create();
    scope = $rootScope.$new();
    scope.fileBrowser = {
      selectedFile: {
        path: '/myFile.raml',
        contents: 'some content',
        save: sandbox.stub().returns(promise.resolved())
      }
    };
  }));

  afterEach(function() {
    scope.$destroy();
    el = scope = undefined;
    sandbox.restore();
  });

  describe('on click', function() {
    var broadcastSpy;

    beforeEach(inject(function($rootScope) {
      broadcastSpy = sandbox.spy($rootScope, '$broadcast');
      compileSaveFileButton();
    }));

    it('saves the file', function() {
      clickSaveFileButton();
      scope.fileBrowser.selectedFile.save.should.have.been.called;
    });

    describe('when ramlRepository successfully saves', function() {
      beforeEach(inject(function($rootScope) {
        clickSaveFileButton();
        $rootScope.$digest();
      }));

      it('broadcasts an event', function() {
        broadcastSpy.should.have.been.calledWith('event:notification', {
          message: 'File saved.',
          expires: true
        });
      });
    });
  });
});
