###
Module description
@class view_fileuploader
@main fileuploader/index/index
@author 
###

yOSON.AppCore.addModule "view_fileuploader", (Sb) ->
	defaults = {}
	st = {}
	dom = {}	
	index = 0
	templates = {}
	filesPending = []

	catchDom = (st) ->
		dom.tplPreview = $(st.tplPreview)
		dom.wrapper = $(st.wrapper, st.content)
		return

	afterCatchDom = ->
		_.templateSettings = 
			evaluate: /\{\{([\s\S]+?)\}\}/g
			interpolate: /\{\{=([\s\S]+?)\}\}/g
		fn.getTemplatesInit()	
		return		

	fn = 
		
		###catchDomTemplate : (content)->			
			dom.btnCancel = $(st.btnCancel, content)
			window.btnCancel = dom.btnCancel						
			return		###

		###suscribeEventsTemplate : ()->
			dom.btnCancel.on('click', events.cancel)

			log "st",st

			dom.btnCancel.on('click', {content:st.itemClass} , (e)->
				Sb.trigger("cancelFile",e)
				return
				)
			return###

		setPreview : (data)->
			# data : de archivos del servidor
			# data : de archivos de cache
			
			# para archivos de cache
			if (data.typeTpl == 'cache')
				filesPending.push(data)


			data.files[0].id = index++
			fn.renderTemplateInit(data.files[0], data.typeTpl)
			return

		getTemplatesInit : ()->
			Sb.trigger("getTemplates", (objTemplates)->
				templates = objTemplates
				return
			)
			return

		setTemplate : (tpl)->
			templates.setTemplate(tpl)
			st = templates[tpl]
			#log "st",st
			catchDom(st)
			return

		renderTemplateInit : (file, typeTpl)->		
			
			fn.setTemplate(typeTpl)			

			#log "file",file

			parentId = fn.mergeData(file, typeTpl)
			
			templates.catchDom(parentId)
			templates.suscribeEvents()

			#fn.catchDomTemplate(layout)
			#fn.suscribeEventsTemplate()
			
			fn.loadImageAsync(file)
			return

		mergeData : (file, typeTpl)->
			#log "dom.tplPreview",dom.tplPreview.html()

			tmpMerge = _.template(dom.tplPreview.html() , {file : file})
			layout = dom.wrapper.append(tmpMerge)
			layout
			
		loadImageAsync : (file)->			
			loadImage(file, (img)->								
				fn.mergeImg(img, file)
				return
			, st.imgSettings
			)
			return

		getFilesPending: (callbackDealFilesPending)->
			callbackDealFilesPending.call(this, filesPending)
			return

		mergeImg : (img, file)->			
			dom.wrapper.find(st.itemClass).eq(file.id).find(st.contentImg).html(img)
			return
	
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		afterCatchDom()
		Sb.events(["setPreview"], fn.setPreview, this)
		Sb.events(["getFilesPending"], fn.getFilesPending, this)
		return

	return {
		init: initialize
	}
,['js/dist/libs/underscore/underscore.js',
  'js/dist/libs/blueimp-load-image/js/load-image.js']