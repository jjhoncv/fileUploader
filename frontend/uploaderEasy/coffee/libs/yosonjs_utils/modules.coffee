yOSON.AppSchema.modules =
	"fileuploader":
		"controllers":
			"home":
				"actions":
					"index": ()->
						yOSON.AppCore.runModule "fileuploader"
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