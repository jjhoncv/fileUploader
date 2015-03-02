###
Module description
@class fileuploader
@main fileuploader/index/index
@author 
###

yOSON.AppCore.addModule "fileuploader", (Sb) ->
	defaults = 
		inputFileUpload : ".fileupload"		
		content 		: ".myfiles"
		fileuploader : 
			url 	 : "../../../server/"
			dataType : 'json'    
	
	st = {}

	dom = {}

	catchDom = (st) ->
		dom.content = $(st.content)
		dom.inputFileUpload = $(st.inputFileUpload, dom.content)
		return
	
	asynCatchDom = ()->
		dom.inputFileUpload.fileupload(defaults.fileuploader)
		return

	functions =     	
		
		getFileuploader: (callbackDealFileUpload)->
			callbackDealFileUpload.call(this, dom.inputFileUpload)
			return

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		asynCatchDom()
		Sb.events(["getFileuploader"], functions.getFileuploader, this)
		return

	return {
		init: initialize
	}
, [ 'js/dist/libs/jquery-ui/ui/widget.js',		
	'js/dist/libs/blueimp-file-upload/js/jquery.fileupload.js']