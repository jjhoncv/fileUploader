
/*
Module description
@class add_fileuploader
@main fileuploader/index/index
@author
 */
yOSON.AppCore.addModule("add_fileuploader", function(Sb) {
  var afterCatchDom, catchDom, defaults, dom, events, fileupload, fn, initialize, st, suscribeEvents, uploadFilesPending;
  defaults = {
    tplPreview: "#tplPreviewCache",
    wrapper: ".wrapper_preview_cache",
    itemClass: ".cache",
    btnCancel: "input",
    imgSettings: {
      maxHeight: 50,
      noRevoke: true
    }
  };
  st = {};
  dom = {};
  fileupload = {};
  uploadFilesPending = [];
  catchDom = function(st) {
    dom.tplPreview = $(st.tplPreview);
    dom.wrapper = $(st.wrapper, st.content);
  };
  afterCatchDom = function() {
    _.templateSettings = {
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g
    };
  };
  suscribeEvents = function() {
    fileupload.on("fileuploadadd", events.fileuploadadd);
  };
  events = {
    fileuploadadd: function(e, data) {
      fn.reset();
      uploadFilesPending.push(data);
      $.each(data.files, fn.preview);
    },
    cancel: function(e) {
      var ele, index;
      ele = $(e.target);
      index = ele.parents(defaults.itemClass).index();
      ele.parents(defaults.itemClass).remove();
      uploadFilesPending.splice(index, 1);
    }
  };
  fn = {
    reset: function() {
      dom.wrapper.find(st.itemClass).remove();
    },
    preview: function(index, file) {
      loadImage(file, function(img) {
        var layout;
        layout = fn.getMergeTplData(img, file);
        dom.btnCancel = $(st.btnCancel, layout);
        dom.btnCancel.on('click', events.cancel);
      }, defaults.imgSettings);
    },
    getMergeTplData: function(img, file) {
      var fieldsMerge, layout, tmpMerge;
      fieldsMerge = {
        file: file,
        img: {
          src: $(img).attr('src'),
          width: $(img).attr("width"),
          height: $(img).attr("height")
        }
      };
      tmpMerge = _.template(dom.tplPreview.html(), fieldsMerge);
      layout = dom.wrapper.append(tmpMerge);
      return layout;
    },
    getFileupload: function() {
      Sb.trigger("getFileuploader", function(objFileupload) {
        fileupload = objFileupload;
      });
    },
    getFilesPending: function(callbackDealFilesPending) {
      callbackDealFilesPending.call(this, uploadFilesPending);
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    fn.getFileupload();
    catchDom(st);
    afterCatchDom();
    suscribeEvents();
    Sb.events(["getFilesPending"], fn.getFilesPending, this);
  };
  return {
    init: initialize
  };
}, ['js/dist/libs/underscore/underscore.js', 'js/dist/libs/blueimp-load-image/js/load-image.js']);


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
