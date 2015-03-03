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

	events = 
		
		cancel : (e)->
			ele = $(e.target)
			index = ele.parents(st.itemClass).index()
			ele.parents(st.itemClass).remove()		
			return

	fn = 
		
		cathDomTemplate : (content)->			
			dom.btnCancel = $(st.btnCancel, content)
			window.btnCancel = dom.btnCancel						
			return		

		suscribeEventsTemplate : ()->
			dom.btnCancel.on('click', events.cancel)
			return

		setPreview : (data)->
			data.files[0].id = index++
			fn.renderTemplateInit(data.files[0], data.type)
			return

		getTemplatesInit : ()->
			Sb.trigger("getTemplates", (objTemplates)->
				templates = objTemplates
				return
			)
			return

		setTemplate : (tpl)->
			st = templates[tpl]
			catchDom(st)
			return

		renderTemplateInit : (file, typeTpl)->		
			
			fn.setTemplate(typeTpl)			

			layout = fn.mergeData(file, typeTpl)
			fn.loadImageAsync(file)
			fn.cathDomTemplate(layout)
			fn.suscribeEventsTemplate()
			return

		mergeData : (file, typeTpl)->
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

		mergeImg : (img, file)->			
			dom.wrapper.find(st.itemClass).eq(file.id).find(st.contentImg).html(img)
			return
	
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		afterCatchDom()
		Sb.events(["setPreview"], fn.setPreview, this)
		return

	return {
		init: initialize
	}
,['js/dist/libs/underscore/underscore.js',
  'js/dist/libs/blueimp-load-image/js/load-image.js']