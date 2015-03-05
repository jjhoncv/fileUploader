yOSON.AppSchema.modules =
	"fileuploader":
		"controllers":
			"home":
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "fileuploader" # publico, el objeto fileupload
						yOSON.AppCore.runModule "templates_fileuploader" #public, los templates
						yOSON.AppCore.runModule "view_fileuploader" #
						yOSON.AppCore.runModule "manager_fileuploader"
						yOSON.AppCore.runModule "submit_fileuploader"
						yOSON.AppCore.runModule "cancel_fileuploader"
						#yOSON.AppCore.runModule "delete_fileuploader"
						#yOSON.AppCore.runModule "sorter_fileuploader"
						
						#yOSON.AppCore.runModule "add_fileuploader"
						#yOSON.AppCore.runModule "send_fileuploader"
						return
					"by_default": () ->
						return
				"all_actions": () ->
					return
			"by_default": () ->
				return
		"all_controllers": () ->
		   return
	"by_default": () ->
		return
	"all_modules": () ->
		return	