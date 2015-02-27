(function($) {
  return $.fn.prettySelect = function(options) {
    var defaults, onSelected, settings, that;
    defaults = {
      target: "span",
      callback: function() {}
    };
    that = this;
    settings = $.extend({}, defaults, options);
    onSelected = function() {
      var element, value;
      element = $(this)[0];
      value = element.options[element.selectedIndex].text;
      $(settings.target).html(value);
      return settings.callback.call(this, value, settings);
    };
    return this.off("change.pretty_select").on("change.pretty_select", onSelected);
  };
})(jQuery);
