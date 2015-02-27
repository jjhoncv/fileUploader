
/*
Módulo para cargar en todo el sitio el plugin jquery-echo
@class load_plugins
@main flux/all
@author Jan Sanchez
 */
yOSON.AppCore.addModule("load_plugins", function(Sb) {
  var fn, initialize, st;
  st = {};
  fn = {
    loadPlugins: function() {
      log('load: jquery-echo.js');
    }
  };
  initialize = function(oP) {
    $.extend(st, oP);
    fn.loadPlugins();
  };
  return {
    init: initialize
  };
}, ["js/dist/libs/jquery-echo/dist/jquery-echo.js"]);
