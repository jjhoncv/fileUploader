###
Module description
@class templates_fileuploader
@main /home/jhonnatan/htdocs/fileuploader/frontend/uploaderEasy/coffee/scripts/modules/fileuploader/home
@author 
###

#datos de configuracion del tpl
yOSON.AppCore.addModule "templates_fileuploader", (Sb) ->
	defaults = 
		cache :
			tplPreview 	: "#tplPreviewCache"
			wrapper 	: ".wrapper_preview_cache"
			itemClass 	: ".cache"
			contentImg  : ".img"
			btnCancel	: "input"
			imgSettings :
				maxHeight : 50
				noRevoke  :true
		upload:	
			tplPreview 	: "#tplPreviewRecentlyUploaded"
			wrapper 	: ".wrapper_preview_recently_uploaded"
			itemClass 	: ".uploaded"
			contentImg  : ".img"
			btnCancel	: "input"
			imgSettings :
				maxHeight : 50
				noRevoke  :true
				
	st = {}

	dom = {}

	cathDom = (parent)->		
		
		st.tpl : 
			cache : ->
				Sb.trigger("catchDomCache", parent)
				return
			upload : ->
				Sb.trigger("catchDomUpload", parent)
				return	


		return

	suscribeEvents = ()->
		st.tpl :
			cache : ->
				Sb.trigger("suscribeEventsCache", parent)
				return

			upload : ->
				Sb.trigger("suscribeEventsUpload", parent)
				return
				
		return

	afterCathDom = (st)->
		dom = st
		return



	fn = 
		setTemplate : (tpl)->
			st.tpl = tpl
			return

		getTemplates: (callbackDealDom)->
			callbackDealDom.call(this, dom)
			return

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)        
		afterCathDom(st)
		Sb.events(["getTemplates"], fn.getTemplates, this)
		return

	return {
		init: initialize
	}
,[]