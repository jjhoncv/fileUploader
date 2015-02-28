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
		itemContentPreview 		: ".cache"
		btnCancelPreviewCache	: "input"
		imgPreviewCache :
			maxHeight : 50
			noRevoke  :true

		

		tplPreviewRecentlyUploaded 			: "#tplPreviewRecentlyUploaded"
		wrapperPreviewRecentlyUploaded 		: ".wrapper_preview_recently_uploaded"
		itemContentPreviewRecentlyUploaded 	: ".uploaded"
		btnCancelPreviewRecentlyUploaded 	: "input"
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
		cancelPreviewFile : (e)->			
			ele = $(e.target)
			index = ele.parents('li').index()
			ele.parents('li').remove()			
			uploadFilesPending.splice(index, 1)			
			return

		deletePreviewFileServer : (e, data)->			
			ele = $(e.target)
			index = ele.parents('li').index()
			ele.parents('li').remove()

			$.blueimp.fileupload.prototype.options.destroy.call(that, e, $.extend({
				context: ele.closest('.server')
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

		previewFilesUpload : (e, data)->	
			that = this
			functions.previewFileUploadReset()
			uploadFilesPending.push(data)
			$.each( data.files, functions.previewFileUpload)			
			return

		previewFileUpload : (index, file)->						
			loadImage(file, (img)->
				layout = functions.getMergeTpl(img, file)				
				dom.btnCancelPreviewCache = $(st.btnCancelPreviewCache, layout)				
				dom.btnCancelPreviewCache.on('click', events.cancelPreviewFile)
				return
			, st.imgPreviewCache)
			return	

		previewFilesServer : (e, data)->	
			functions.previewFileServerReset()
			$.each( data.files, functions.previewFileServer)
			return

		previewFileServer : (index, file)->
			
			loadImage(file, (img)->
				functions.getMergeTpl(img, file)
				return
			, st.imgPreviewRecentlyUploaded)
			
			return

		previewFileUploadReset : ()->
			$("ul li.server").remove()
			$('h3').text('Preview')
			return

		getMergeTpl : (img, file)->
			fielsMerge = 
				file : file
				img  : 
					src : $(img).attr('src')
					width : $(img).attr("width")
					height : $(img).attr("height")
				button : 
					type : 'button'
					value: 'Cancel'

			tmpMerge = _.template(dom.tplPreviewCache.html() , fielsMerge)
			layout = dom.wrapperPreviewCache.append(tmpMerge)
			
			layout		

		previewFileServerReset : ()->
			$("ul li").filter(st.itemContentPreview).remove()			
			$('h3').text('Uploaders')
			return

		

		insertFile : (file, settingsButton)->
			
			loadImage( file, ((img) ->

				btn = $('<input>',settingsButton)

				$('<li></li>',{
					class: file.class
					html : '<p>'+file.name+'</p>'
				}).append(img).append(btn).appendTo($('ul'))
				return
			), 				
				maxHeight: 50
			)	
			return			

		elementAddFileUpload : (index, file)->
			$("<p/>").text(file.name).appendTo(document.body);
			return

		SettingsFileupload : ->			
			ul = $('<ul></ul>').appendTo(document.body)
			$('<h3>').insertAfter($("#subir"))

			options = 
				url : st.urlServerPHP
				dataType: 'json'				
				add : functions.previewFilesUpload					
				done : functions.previewFilesServer					 
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