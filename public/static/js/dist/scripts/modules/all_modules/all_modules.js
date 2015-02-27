
/*
el plugin AttrChange sirve para detectar cambios en los atributos de elementos
@class add_msie
@main flux/all
@author Paúl Díaz
 */
yOSON.AppCore.addModule("add_msie", function(Sb) {
  var fn, initialize, st;
  st = {
    msie_regex: /MSIE ([0-9]+)\./
  };
  fn = {
    setConfiguration: function() {
      jQuery.browser = {};
      jQuery.browser.msie = false;
      jQuery.browser.version = 0;
      if (navigator.userAgent.match(st.msie_regex)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
      }
    }
  };
  initialize = function(oP) {
    $.extend(oP);
    fn.setConfiguration();
  };
  return {
    init: initialize
  };
});


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


/*
Crea el picker usando el plugin de jquery-ui
@class picker
@main flux/all
@author Paúl Díaz
 */
yOSON.AppCore.addModule("picker", function(Sb) {
  var catchDom, dom, events, functions, initialize, st, suscribeEvents;
  dom = {};
  st = {
    picker: ".picker",
    pickerSpan: ".picker > span",
    txtExpiry: "#xCaducidad"
  };
  catchDom = function() {
    dom.picker = $(st.picker);
    dom.pickerSpan = $(st.pickerSpan);
    dom.txtExpiry = $(st.txtExpiry);
  };
  suscribeEvents = function() {
    dom.pickerSpan.on("click", events.clickPicker);
  };
  events = {
    clickPicker: function(e) {
      dom.txtExpiry.trigger("focus");
    }
  };
  functions = {
    picker: function() {
      $.datepicker.setDefaults($.datepicker.regional["es"]);
      dom.txtExpiry.datepicker({
        dateFormat: "dd/mm/y",
        onSelect: function() {
          dom.txtExpiry.trigger("blur");
        }
      });
    }
  };
  initialize = function(oP) {
    $.extend(st, oP);
    catchDom();
    suscribeEvents();
    functions.picker();
  };
  return {
    init: initialize
  };
}, ["js/dist/libs/jquery-ui/jquery-ui.min.js", "js/dist/libs/jquery-ui/ui/i18n/datepicker-es.js"]);


/*
Agrega funcionalidad de placeholder a navegadores que no lo soporten
@class placeholder
@main flux/all
@author Ana Reyna
 */
yOSON.AppCore.addModule("placeholder", function(Sb) {
  var catchDom, dom, fn, initialize, st;
  dom = {};
  st = {
    inputs: "input, textarea"
  };
  catchDom = function() {
    dom.inputs = $(st.inputs);
  };
  fn = {
    enablePlaceholder: function() {
      dom.inputs.placeholder();
    }
  };
  initialize = function(oP) {
    $.extend(st, oP);
    catchDom();
    fn.enablePlaceholder();
  };
  return {
    init: initialize
  };
}, ["js/dist/libs/jquery-placeholder/jquery.placeholder.js"]);


/*
Modulo para resetear la cookie de busqueda
@class reset_cookie
@main all_modules/controller
@author Moises Yance, Wilson Flores
 */
yOSON.AppCore.addModule("reset_cookie", function(Sb) {
  var catchDom, defaults, dom, events, fn, initialize, st, suscribeEvents;
  st = {
    right_mouse_button: 3,
    middle_mouse_button: 2
  };
  dom = {};
  defaults = {
    parent: ".list_locations",
    el: "li a",
    cookieName: "search_online",
    newCookie: yOSON.tmp.cookie_online
  };
  catchDom = function() {
    dom.parent = $(st.parent);
    dom.el = $(st.el, dom.parent);
  };
  suscribeEvents = function() {
    dom.el.on("click", events.toReset);
    dom.el.on("mouseup", events.toReset);
  };
  events = {
    toReset: function(e) {
      return fn.resetCookie(st.cookieName, st.newCookie);
    },
    mouseup: function(e) {
      if (e.which === st.right_mouse_button || e.which === st.middle_mouse_button) {
        fn.resetCookie(st.cookieName, st.newCookie);
        return e.preventDefault();
      }
    }
  };
  fn = {
    resetCookie: function(cookieName, cookie) {
      fn.saveCookie(cookieName, cookie);
    },
    saveCookie: function(cookieName, cookie) {
      Cookie.create(cookieName, JSON.stringify(cookie));
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom();
    suscribeEvents();
    Sb.events(["allResetCookie"], fn.resetCookie, this);
  };
  return {
    init: initialize
  };
}, ["js/dist/libs/fancybox/source/jquery.fancybox.pack.js", "js/dist/libs/jquery-echo/jquery.echo.js"]);
