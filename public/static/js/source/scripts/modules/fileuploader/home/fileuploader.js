
/*
Module description
@class fileuploader
@main fileuploader/index/index
@author
 */
yOSON.AppCore.addModule("fileuploader", function(Sb) {
  var asynCatchDom, catchDom, defaults, dom, functions, initialize, st;
  defaults = {
    inputFileUpload: ".fileupload",
    content: ".myfiles",
    fileuploader: {
      url: "../../../server/",
      dataType: 'json'
    }
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.content = $(st.content);
    dom.inputFileUpload = $(st.inputFileUpload, dom.content);
  };
  asynCatchDom = function() {
    dom.inputFileUpload.fileupload(defaults.fileuploader);
  };
  functions = {
    getFileuploader: function(callbackDealFileUpload) {
      callbackDealFileUpload.call(this, dom.inputFileUpload);
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    asynCatchDom();
    Sb.events(["getFileuploader"], functions.getFileuploader, this);
  };
  return {
    init: initialize
  };
}, ['js/dist/libs/jquery-ui/ui/widget.js', 'js/dist/libs/blueimp-file-upload/js/jquery.fileupload.js']);
