
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
