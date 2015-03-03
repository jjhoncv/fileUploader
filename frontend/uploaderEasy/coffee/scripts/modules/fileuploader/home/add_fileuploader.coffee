###
Module description
@class add_fileuploader
@main fileuploader/index/index
@author 
###

yOSON.AppCore.addModule "add_fileuploader", (Sb) ->
	defaults = 
		tplPreview 	: "#tplPreviewCache"
		wrapper 	: ".wrapper_preview_cache"
		itemClass 	: ".cache"
		btnCancel	: "input"		
		imgSettings :
			maxHeight : 50
			noRevoke  : true

	st = {}

	dom = {}

	fileupload = {}

	uploadFilesPending = []
	
	catchDom = (st) ->
		dom.tplPreview = $(st.tplPreview)
		dom.wrapper = $(st.wrapper, st.content)
		return

	afterCatchDom = ->
		_.templateSettings = 
			evaluate: /\{\{([\s\S]+?)\}\}/g
			interpolate: /\{\{=([\s\S]+?)\}\}/g
		return

	suscribeEvents = () ->
		fileupload.on("fileuploadadd", events.fileuploadadd)
		return
	
	events = 
		fileuploadadd : (e, data)->			
			fn.reset()
			uploadFilesPending.push(data)
			$.each( data.files, fn.preview)
			return

		cancel : (e)->
			ele = $(e.target)
			index = ele.parents(defaults.itemClass).index()
			ele.parents(defaults.itemClass).remove()			
			uploadFilesPending.splice(index, 1)			
			return
			
	fn = 
		reset : ()->
			dom.wrapper.find(st.itemClass).remove()			
			return

		preview : (index, file)->		

			loadImage(file, (img)->
				
				layout = fn.getMergeTplData(img, file)				
				dom.btnCancel = $(st.btnCancel, layout)				
				dom.btnCancel.on('click', events.cancel)				
				return

			, defaults.imgSettings)

			return
		
		getMergeTplData: (img, file)->
			fieldsMerge = 
				file : file
				img  : 
					src 	: $(img).attr('src')
					width 	: $(img).attr("width")
					height 	: $(img).attr("height")
				
			tmpMerge = _.template(dom.tplPreview.html() , fieldsMerge)
			layout = dom.wrapper.append(tmpMerge)
			
			layout

		getFileupload : ()->
			Sb.trigger("getFileuploader", (objFileupload)->
				fileupload = objFileupload
				return
			)
			return

		getFilesPending: (callbackDealFilesPending)->			
			callbackDealFilesPending.call(this, uploadFilesPending)
			return
	
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		fn.getFileupload()
		catchDom(st)
		afterCatchDom()
		suscribeEvents()
		Sb.events(["getFilesPending"], fn.getFilesPending, this)
		return

	return {
		init: initialize
	}
,['js/dist/libs/underscore/underscore.js',
  'js/dist/libs/blueimp-load-image/js/load-image.js']