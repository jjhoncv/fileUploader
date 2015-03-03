###
Module description
@class preview_fileuploader
@main fileuploader/index/index
@author 
###

yOSON.AppCore.addModule "preview_fileuploader", (Sb) ->
	defaults = {
		tplPreview 	: "#tplPreviewCache"
		wrapper 	: ".wrapper_preview_cache"
		itemClass 	: ".cache"
		btnCancel	: "input"		
		imgSettings :
			maxHeight : 50
			noRevoke  :true
	}
	st = {}
	dom = {}
	layout = {}

	catchDom = () ->
		dom.tplPreview = $(st.tplPreview)
		dom.wrapper = $(st.wrapper, st.content)
		return

	afterCatchDom = ->
		_.templateSettings = 
			evaluate: /\{\{([\s\S]+?)\}\}/g
			interpolate: /\{\{=([\s\S]+?)\}\}/g
		return

	suscribeEvents = () ->
		dom.el.on "click",   events.camelCase
		return

	events = {
		camelCase : (e) ->
			console.log(e)

		cancel : (e)->
			ele = $(e.target)
			index = ele.parents(defaults.itemClass).index()
			ele.parents(defaults.itemClass).remove()			
			#uploadFilesPending.splice(index, 1)			
			return
	}
	fn = 
		
		reset : ()->
			dom.wrapper.find(st.itemClass).remove()			
			return		

		renderTemplate : (file, type)->
			fn.getMergeTplData(file)
			#dom.btnCancel = $(st.btnCancel, layout)				
			#dom.btnCancel.on('click', events.cancel)
			return
		
		getMergeTplData: (file)->
							
			tmpMerge = _.template(dom.tplPreview.html() , {file : file})
			layout = dom.wrapper.append(tmpMerge)
			return		

		preview : (file, typeTpl)->
			fn.renderTemplate(file, typeTpl)
			loadImage(file, fn.callbackLoadImage, defaults.imgSettings)
			return

		callbackLoadImage : (img)->
			$(layout).find('.img').html(img)
			return

		setPreview : (data)->
			$.each( data.files, (index, file)->
				fn.preview(file, data.type)
				return
			)
			return	
	
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		afterCatchDom()
		#suscribeEvents()
		Sb.events(["setPreview"], fn.setPreview, this)
		return

	return {
		init: initialize
	}
,['js/dist/libs/underscore/underscore.js',
  'js/dist/libs/blueimp-load-image/js/load-image.js']