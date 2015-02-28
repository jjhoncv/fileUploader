
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
    itemContentPreview: ".cache",
    btnCancelPreviewCache: "input",
    imgPreviewCache: {
      maxHeight: 50,
      noRevoke: true
    },
    tplPreviewRecentlyUploaded: "#tplPreviewRecentlyUploaded",
    wrapperPreviewRecentlyUploaded: ".wrapper_preview_recently_uploaded",
    itemContentPreviewRecentlyUploaded: ".uploaded",
    btnCancelPreviewRecentlyUploaded: "input",
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
    cancelPreviewFile: function(e) {
      var ele, index;
      ele = $(e.target);
      index = ele.parents('li').index();
      ele.parents('li').remove();
      uploadFilesPending.splice(index, 1);
    },
    deletePreviewFileServer: function(e, data) {
      var ele, index;
      ele = $(e.target);
      index = ele.parents('li').index();
      ele.parents('li').remove();
      $.blueimp.fileupload.prototype.options.destroy.call(that, e, $.extend({
        context: ele.closest('.server')
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
    previewFilesUpload: function(e, data) {
      that = this;
      functions.previewFileUploadReset();
      uploadFilesPending.push(data);
      $.each(data.files, functions.previewFileUpload);
    },
    previewFileUpload: function(index, file) {
      loadImage(file, function(img) {
        var layout;
        layout = functions.getMergeTpl(img, file);
        dom.btnCancelPreviewCache = $(st.btnCancelPreviewCache, layout);
        dom.btnCancelPreviewCache.on('click', events.cancelPreviewFile);
      }, st.imgPreviewCache);
    },
    previewFilesServer: function(e, data) {
      functions.previewFileServerReset();
      $.each(data.files, functions.previewFileServer);
    },
    previewFileServer: function(index, file) {
      loadImage(file, function(img) {
        functions.getMergeTpl(img, file);
      }, st.imgPreviewRecentlyUploaded);
    },
    previewFileUploadReset: function() {
      $("ul li.server").remove();
      $('h3').text('Preview');
    },
    getMergeTpl: function(img, file) {
      var fielsMerge, layout, tmpMerge;
      fielsMerge = {
        file: file,
        img: {
          src: $(img).attr('src'),
          width: $(img).attr("width"),
          height: $(img).attr("height")
        },
        button: {
          type: 'button',
          value: 'Cancel'
        }
      };
      tmpMerge = _.template(dom.tplPreviewCache.html(), fielsMerge);
      layout = dom.wrapperPreviewCache.append(tmpMerge);
      return layout;
    },
    previewFileServerReset: function() {
      $("ul li").filter(st.itemContentPreview).remove();
      $('h3').text('Uploaders');
    },
    insertFile: function(file, settingsButton) {
      loadImage(file, (function(img) {
        var btn;
        btn = $('<input>', settingsButton);
        $('<li></li>', {
          "class": file["class"],
          html: '<p>' + file.name + '</p>'
        }).append(img).append(btn).appendTo($('ul'));
      }), {
        maxHeight: 50
      });
    },
    elementAddFileUpload: function(index, file) {
      $("<p/>").text(file.name).appendTo(document.body);
    },
    SettingsFileupload: function() {
      var ul;
      ul = $('<ul></ul>').appendTo(document.body);
      $('<h3>').insertAfter($("#subir"));
      options = {
        url: st.urlServerPHP,
        dataType: 'json',
        add: functions.previewFilesUpload,
        done: functions.previewFilesServer
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
