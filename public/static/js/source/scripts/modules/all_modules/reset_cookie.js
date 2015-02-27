
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
