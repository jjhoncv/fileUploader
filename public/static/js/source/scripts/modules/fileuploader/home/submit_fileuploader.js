
/*
Module description
@class submit_fileuploader
@main fileuploader/index/index
@author
 */
yOSON.AppCore.addModule("submit_fileuploader", function(Sb) {
  var catchDom, defaults, dom, events, filesPending, fileupload, fn, initialize, st, suscribeEvents;
  defaults = {
    content: ".myfiles",
    btnUpload: ".subir"
  };
  st = {};
  dom = {};
  fileupload = {};
  filesPending = [];
  catchDom = function(st) {
    dom.content = $(st.content);
    dom.btnUpload = $(st.btnUpload, dom.content);
  };
  suscribeEvents = function() {
    dom.btnUpload.on("click", events.submit);
  };
  events = {
    submit: function(e) {
      fn.getFilesPending();
      filesPending.forEach(fn.uploadFilesPending);
      filesPending = [];
    }
  };
  fn = {
    uploadFilesPending: function(file) {
      file.submit();
    },
    getFileupload: function() {
      Sb.trigger("getFileuploader", function(objFileupload) {
        fileupload = objFileupload;
      });
    },
    getFilesPending: function() {
      Sb.trigger("getFilesPending", function(objFilesPending) {
        filesPending = objFilesPending;
      });
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    fn.getFileupload();
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, []);
