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
			autoUpload: false  
	
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


	# 1   Creo el objeto fileupload
	# 2   Seteo que accion hacer
	#
	# 2.1 fn ADD :
    #      a- Obtener el HTML de mi tpl cache
    #      b- Obtener los files pendientes de cache
    #      c- Merge de data Cache con HTML
    #      d- Add funcionalidad
    #
    # 2.2 fn Upload:
    #      a- Obtener el HTML de mi tpl Upload
    #      b- Obtener los files pendientes a subir
    #      c- Merge la data con el HTML
    #      d- Add funcionalidad

    # Separar funcionalidad de CANCEL y de DELETE del boton, asi como SUBMIT

