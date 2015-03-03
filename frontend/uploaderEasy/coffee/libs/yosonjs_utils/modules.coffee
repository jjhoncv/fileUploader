yOSON.AppSchema.modules =
	"fileuploader":
		"controllers":
			"home":
				"actions":
					"index": ()->						
						yOSON.AppCore.runModule "fileuploader"
						yOSON.AppCore.runModule "preview_fileuploader"
						yOSON.AppCore.runModule "manager_fileuploader"
						
						#yOSON.AppCore.runModule "add_fileuploader"
						#yOSON.AppCore.runModule "submit_fileuploader"
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