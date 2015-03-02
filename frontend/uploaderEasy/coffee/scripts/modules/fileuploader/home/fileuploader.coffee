###
Funcionaldidades para el fileuploader
@class fileuploader
@main fileuploader/index/index
@author Jhonnatan Castro
###
yOSON.AppCore.addModule "fileuploader", (Sb) ->

	st =
		inputFileUpload 		: "#fileupload"
		btnUpload 				: "#subir"
		urlServerPHP 			: "../../../server/"
		content 				: ".content"
		
		
		tplPreviewCache 		: "#tplPreviewCache"
		wrapperPreviewCache 	: ".wrapper_preview_cache"
		itemClassPreviewCache 	: ".cache"
		btnCancelPreviewCache	: "input"
		imgPreviewCache :
			maxHeight : 50
			noRevoke  :true

		

		tplPreviewRecentlyUploaded 			: "#tplPreviewRecentlyUploaded"
		wrapperPreviewRecentlyUploaded 		: ".wrapper_preview_recently_uploaded"
		itemClassPreviewRecentlyUploaded 	: ".uploaded"
		btnDeletePreviewRecentlyUploaded 	: "input"
		imgPreviewRecentlyUploaded :
			maxHeight : 50
			noRevoke  :true			
		

	
	uploadFilesPending = []
	that = {}
	options = {}	
	dom = {}
	catchDom = ->
		
		dom.inputFileUpload = $(st.inputFileUpload)
		dom.content = $(st.content)
		dom.btnUpload = $(st.btnUpload)       
		
		dom.tplPreviewCache = $(st.tplPreviewCache)
		dom.wrapperPreviewCache = $(st.wrapperPreviewCache, st.content)

		dom.tplPreviewRecentlyUploaded = $(st.tplPreviewRecentlyUploaded)
		dom.wrapperPreviewRecentlyUploaded = $(st.wrapperPreviewRecentlyUploaded)		
		return  

	afterCatchDom = ->
		_.templateSettings = 
            evaluate: /\{\{([\s\S]+?)\}\}/g
            interpolate: /\{\{=([\s\S]+?)\}\}/g

		functions.SettingsFileupload();
		return
	asynAfterCatchDom = ->

		return

	suscribeEvents = ->			
		dom.inputFileUpload.fileupload(options)
		dom.btnUpload.on('click', events.uploadFiles)
		return
	events = 
		cancelPreviewFileCache : (e)->			
			
			ele = $(e.target)
			index = ele.parents('li').index()
			ele.parents('li').remove()			
			uploadFilesPending.splice(index, 1)			
			return

		deletePreviewFileRecentlyUploaded : (e)->			
			
			ele = $(e.target)
			index = ele.parents('li').index()
			ele.parents('li').remove()

			$.blueimp.fileupload.prototype.options.destroy.call(that, e, $.extend({
				context: ele.closest(st.itemClassPreviewRecentlyUploaded)
            }, ele.data()));			
			return

		uploadFiles : (e)->						
			uploadFilesPending.forEach(functions.uploadFileServer)
			uploadFilesPending = []			
			return

	functions = 
		
		uploadFileServer : (file)->
			file.submit()
			return

		previewFilesCache : (e, data)->	
			
			that = this
			functions.previewFileCacheReset()
			uploadFilesPending.push(data)
			$.each( data.files, functions.previewFileCache)			
			return

		previewFileCache : (index, file)->						
			
			loadImage(file, (img)->
				
				layout = functions.getMergeTplPreviewCache(img, file)				
				dom.btnCancelPreviewCache = $(st.btnCancelPreviewCache, layout)				
				dom.btnCancelPreviewCache.on('click', events.cancelPreviewFileCache)

				return
			, st.imgPreviewCache)
			return	

		previewFilesRecentlyUpload : (e, data)->	
			
			functions.previewFilesRecentlyUploadReset()
			$.each( data.files, functions.previewFileRecentlyUpload)
			return

		previewFileRecentlyUpload : (index, file)->
			
			loadImage(file, (img)->
				
				layout = functions.getMergeTplPreviewFileRecentlyUpload(img, file)				
				dom.btnDeletePreviewRecentlyUploaded = $(st.btnDeletePreviewRecentlyUploaded, layout)				
				dom.btnDeletePreviewRecentlyUploaded.on('click', events.deletePreviewFileRecentlyUploaded)

				return
			, st.imgPreviewRecentlyUploaded)			
			return

		previewFileCacheReset : ()->
			
			$("ul li").filter(st.itemClassPreviewRecentlyUploaded).remove()
			$('h3').text('Preview')
			return

		getMergeTplPreviewFileRecentlyUpload : (img, file)->
			
			fielsMerge = 
				file : file
				img  : 
					src 	: $(img).attr('src')
					width 	: $(img).attr("width")
					height 	: $(img).attr("height")
				button : 					
					dataUrl : st.urlServerPHP + '?file=' + file.name

			tmpMerge = _.template(dom.tplPreviewRecentlyUploaded.html() , fielsMerge)
			layout = dom.wrapperPreviewRecentlyUploaded.append(tmpMerge)
			
			layout					

		getMergeTplPreviewCache : (img, file)->
			
			fielsMerge = 
				file : file
				img  : 
					src 	: $(img).attr('src')
					width 	: $(img).attr("width")
					height 	: $(img).attr("height")
				
			tmpMerge = _.template(dom.tplPreviewCache.html() , fielsMerge)
			layout = dom.wrapperPreviewCache.append(tmpMerge)
			
			layout		

		previewFilesRecentlyUploadReset : ()->
			
			$("ul li").filter(st.itemClassPreviewCache).remove()			
			$('h3').text('Uploaders')
			return
		
		SettingsFileupload : ->
			
			options = 
				url : st.urlServerPHP
				dataType: 'json'				
				add : functions.previewFilesCache					
				done: functions.previewFilesRecentlyUpload
			return

	initialize = (oP) ->
		$.extend st, oP
		catchDom()
		afterCatchDom()
		suscribeEvents()
		return

	return {
		init: initialize
	}

, [ 'js/dist/libs/underscore/underscore.js',	
	'js/dist/libs/jquery-ui/ui/widget.js',	
	'js/dist/libs/blueimp-load-image/js/load-image.js',
	'js/dist/libs/blueimp-file-upload/js/jquery.fileupload.js',
	'js/dist/libs/blueimp-file-upload/js/jquery.fileupload-ui.js'
]