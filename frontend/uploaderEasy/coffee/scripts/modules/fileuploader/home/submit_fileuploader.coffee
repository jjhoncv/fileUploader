###
Module description
@class submit_fileuploader
@main fileuploader/index/index
@author 
###

yOSON.AppCore.addModule "submit_fileuploader", (Sb) ->
	defaults = 
		content 	: ".myfiles"
		btnUpload 	: ".subir"
	
	st = {}

	dom = {}

	fileupload = {}

	filesPending = []

	catchDom = (st) ->
		dom.content = $(st.content)
		dom.btnUpload = $(st.btnUpload, dom.content)
		return

	suscribeEvents = () ->
		dom.btnUpload.on "click", events.submit
		return

	events = 
		submit : (e) ->
			fn.getFilesPending()			
			filesPending.forEach(fn.uploadFilesPending)
			filesPending = []
			return
	
	fn = 
		uploadFilesPending : (file)->
			file.submit()
			return

		getFileupload : ()->
			Sb.trigger("getFileuploader", (objFileupload)->
				fileupload = objFileupload
				return
			)
			return

		getFilesPending : ()->
			Sb.trigger("getFilesPending", (objFilesPending)->
				filesPending = objFilesPending
				return
			)
			return	
	
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		fn.getFileupload()		
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,[]