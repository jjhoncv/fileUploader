###
Module description
@class cancel_fileuploader
@main /home/jhonnatan/htdocs/fileuploader/frontend/uploaderEasy/coffee/scripts/modules/fileuploader/home
@author 
###

yOSON.AppCore.addModule "cancel_fileuploader", (Sb) ->
	
	defaults = {}
	
	st = {}
	
	dom = {}
	
	catchDom = (st) ->
		dom.btnCancel = $(st.btnCancel, st.parentId)
		#dom.el     = $(st.el, dom.parent)
		return
	suscribeEvents = () ->
		dom.btnCancel.on "click",   events.cancel		
		return

	events = 
		cancel : (e)->
			#log "event",e
			ele = $(e.target)
			#itemClass = e.data.item
			#index = ele.parents(class).index()
			ele.parents(e.data.content).remove()
			return

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom()
		suscribeEvents()
		Sb.events(["cancelFile"], events.cancel, this)        
		Sb.events(["catchDomCache"], catchDom, this)
		Sb.events(["suscribeEventsCache"], suscribeEvents, this)
		    
		return

	return {
		init: initialize
	}
,[]