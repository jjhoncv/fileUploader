###
Module description
@class manager_fileuploader
@main /home/jhonnatan/htdocs/fileuploader/frontend/uploaderEasy/coffee/scripts/modules/fileuploader/home
@author 
###

yOSON.AppCore.addModule "manager_fileuploader", (Sb) ->

	fileupload = {}
	data = {}

	catchDom = () ->
		fn.getFileupload()
		return

	suscribeEvents = () ->
		fileupload.on("fileuploadadd", events.fileuploadadd)
		return

	events = 
		
		fileuploadadd : (e, data) ->			
			Sb.trigger("setPreview", $.extend({type:'add'}, data))
			return
	
	fn = 
		getData : (callbackDealData)->
			callbackDealData.call(this, data)
			return

		getFileupload : ()->
			Sb.trigger("getFileuploader", (objFileupload)->
				fileupload = objFileupload
				return
			)
			return
	
	initialize = (opts) ->		
		catchDom()				
		suscribeEvents()
		#Sb.events(["fileuploadadd"], events.fileuploadadd, this)
		Sb.events(["getData"], fn.getData, this)
		return

	return {
		init: initialize
	}
,[]