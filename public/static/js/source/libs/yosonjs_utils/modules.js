yOSON.AppSchema.modules = {
  "fileuploader": {
    "controllers": {
      "home": {
        "actions": {
          "index": function() {
            yOSON.AppCore.runModule("fileuploader");
          },
          "by_default": function() {}
        },
        "all_actions": function() {}
      },
      "by_default": function() {}
    },
    "all_controllers": function() {}
  },
  "by_default": function() {},
  "all_modules": function() {}
};
