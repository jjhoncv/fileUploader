
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
