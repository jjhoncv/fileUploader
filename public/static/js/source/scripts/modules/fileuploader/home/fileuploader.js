
/*
Funcionaldidades para el fileuploader
@class fileuploader
@main fileuploader/index/index
@author Jhonnatan Castro
 */
yOSON.AppCore.addModule("fileuploader", function(Sb) {
  var afterCatchDom, asynAfterCatchDom, catchDom, dom, events, functions, initialize, options, st, suscribeEvents, that, uploadFilesPending;
  st = {
    inputFileUpload: "#fileupload",
    btnUpload: "#subir",
    urlServerPHP: "../../../server/",
    content: ".content",
    tplPreviewCache: "#tplPreviewCache",
    wrapperPreviewCache: ".wrapper_preview_cache",
    itemClassPreviewCache: ".cache",
    btnCancelPreviewCache: "input",
    imgPreviewCache: {
      maxHeight: 50,
      noRevoke: true
    },
    tplPreviewRecentlyUploaded: "#tplPreviewRecentlyUploaded",
    wrapperPreviewRecentlyUploaded: ".wrapper_preview_recently_uploaded",
    itemClassPreviewRecentlyUploaded: ".uploaded",
    btnDeletePreviewRecentlyUploaded: "input",
    imgPreviewRecentlyUploaded: {
      maxHeight: 50,
      noRevoke: true
    }
  };
  uploadFilesPending = [];
  that = {};
  options = {};
  dom = {};
  catchDom = function() {
    dom.inputFileUpload = $(st.inputFileUpload);
    dom.content = $(st.content);
    dom.btnUpload = $(st.btnUpload);
    dom.tplPreviewCache = $(st.tplPreviewCache);
    dom.wrapperPreviewCache = $(st.wrapperPreviewCache, st.content);
    dom.tplPreviewRecentlyUploaded = $(st.tplPreviewRecentlyUploaded);
    dom.wrapperPreviewRecentlyUploaded = $(st.wrapperPreviewRecentlyUploaded);
  };
  afterCatchDom = function() {
    _.templateSettings = {
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g
    };
    functions.SettingsFileupload();
  };
  asynAfterCatchDom = function() {};
  suscribeEvents = function() {
    dom.inputFileUpload.fileupload(options);
    dom.btnUpload.on('click', events.uploadFiles);
  };
  events = {
    cancelPreviewFileCache: function(e) {
      var ele, index;
      ele = $(e.target);
      index = ele.parents('li').index();
      ele.parents('li').remove();
      uploadFilesPending.splice(index, 1);
    },
    deletePreviewFileRecentlyUploaded: function(e) {
      var ele, index;
      ele = $(e.target);
      index = ele.parents('li').index();
      ele.parents('li').remove();
      $.blueimp.fileupload.prototype.options.destroy.call(that, e, $.extend({
        context: ele.closest(st.itemClassPreviewRecentlyUploaded)
      }, ele.data()));
    },
    uploadFiles: function(e) {
      uploadFilesPending.forEach(functions.uploadFileServer);
      uploadFilesPending = [];
    }
  };
  functions = {
    uploadFileServer: function(file) {
      file.submit();
    },
    previewFilesCache: function(e, data) {
      that = this;
      functions.previewFileCacheReset();
      uploadFilesPending.push(data);
      $.each(data.files, functions.previewFileCache);
    },
    previewFileCache: function(index, file) {
      loadImage(file, function(img) {
        var layout;
        layout = functions.getMergeTplPreviewCache(img, file);
        dom.btnCancelPreviewCache = $(st.btnCancelPreviewCache, layout);
        dom.btnCancelPreviewCache.on('click', events.cancelPreviewFileCache);
      }, st.imgPreviewCache);
    },
    previewFilesRecentlyUpload: function(e, data) {
      functions.previewFilesRecentlyUploadReset();
      $.each(data.files, functions.previewFileRecentlyUpload);
    },
    previewFileRecentlyUpload: function(index, file) {
      loadImage(file, function(img) {
        var layout;
        layout = functions.getMergeTplPreviewFileRecentlyUpload(img, file);
        dom.btnDeletePreviewRecentlyUploaded = $(st.btnDeletePreviewRecentlyUploaded, layout);
        dom.btnDeletePreviewRecentlyUploaded.on('click', events.deletePreviewFileRecentlyUploaded);
      }, st.imgPreviewRecentlyUploaded);
    },
    previewFileCacheReset: function() {
      $("ul li").filter(st.itemClassPreviewRecentlyUploaded).remove();
      $('h3').text('Preview');
    },
    getMergeTplPreviewFileRecentlyUpload: function(img, file) {
      var fielsMerge, layout, tmpMerge;
      fielsMerge = {
        file: file,
        img: {
          src: $(img).attr('src'),
          width: $(img).attr("width"),
          height: $(img).attr("height")
        },
        button: {
          dataUrl: st.urlServerPHP + '?file=' + file.name
        }
      };
      tmpMerge = _.template(dom.tplPreviewRecentlyUploaded.html(), fielsMerge);
      layout = dom.wrapperPreviewRecentlyUploaded.append(tmpMerge);
      return layout;
    },
    getMergeTplPreviewCache: function(img, file) {
      var fielsMerge, layout, tmpMerge;
      fielsMerge = {
        file: file,
        img: {
          src: $(img).attr('src'),
          width: $(img).attr("width"),
          height: $(img).attr("height")
        }
      };
      tmpMerge = _.template(dom.tplPreviewCache.html(), fielsMerge);
      layout = dom.wrapperPreviewCache.append(tmpMerge);
      return layout;
    },
    previewFilesRecentlyUploadReset: function() {
      $("ul li").filter(st.itemClassPreviewCache).remove();
      $('h3').text('Uploaders');
    },
    SettingsFileupload: function() {
      options = {
        url: st.urlServerPHP,
        dataType: 'json',
        add: functions.previewFilesCache,
        done: functions.previewFilesRecentlyUpload
      };
    }
  };
  initialize = function(oP) {
    $.extend(st, oP);
    catchDom();
    afterCatchDom();
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, ['js/dist/libs/underscore/underscore.js', 'js/dist/libs/jquery-ui/ui/widget.js', 'js/dist/libs/blueimp-load-image/js/load-image.js', 'js/dist/libs/blueimp-file-upload/js/jquery.fileupload.js', 'js/dist/libs/blueimp-file-upload/js/jquery.fileupload-ui.js']);
