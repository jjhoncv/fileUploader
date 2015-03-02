
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
