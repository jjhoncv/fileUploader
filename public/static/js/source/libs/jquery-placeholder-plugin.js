(function($) {
  "use strict";
  $.extend({
    placeholder: {
      settings: {
        focusClass: "placeholderFocus",
        activeClass: "placeholder",
        overrideSupport: false,
        preventRefreshIssues: true
      }
    }
  });
  $.support.placeholder = "placeholder" in document.createElement("input");
  $.fn.plVal = $.fn.val;
  $.fn.val = function(value) {
    var currentValue, el, returnValue;
    el = void 0;
    if (typeof value === "undefined") {
      el = $(this[0]);
      if (el.hasClass($.placeholder.settings.activeClass) && el.plVal() === el.attr("placeholder")) {
        return "";
      }
      return $.fn.plVal.call(this);
    } else {
      el = $(this[0]);
      currentValue = el.plVal();
      returnValue = $(this).plVal(value);
      if (el.hasClass($.placeholder.settings.activeClass) && currentValue === el.attr("placeholder")) {
        el.removeClass($.placeholder.settings.activeClass);
        return returnValue;
      }
      return $.fn.plVal.call(this, value);
    }
  };
  $(window).bind("beforeunload.placeholder", function() {
    var els;
    els = $("input." + $.placeholder.settings.activeClass);
    if (els.length > 0) {
      els.val("").attr("autocomplete", "off");
    }
  });
  $.fn.placeholder = function(opts) {
    opts = $.extend({}, $.placeholder.settings, opts);
    if (!opts.overrideSupport && $.support.placeholder) {
      return this;
    }
    return this.each(function() {
      var $el;
      $el = $(this);
      if (!$el.is("[placeholder]")) {
        return;
      }
      if ($el.is(":password")) {
        return;
      }
      if (opts.preventRefreshIssues) {
        $el.attr("autocomplete", "off");
      }
      $el.bind("focus.placeholder", function() {
        $el = $(this);
        if (this.value === $el.attr("placeholder") && $el.hasClass(opts.activeClass)) {
          $el.val("").removeClass(opts.activeClass).addClass(opts.focusClass);
        }
      });
      $el.bind("blur.placeholder", function() {
        $el = $(this);
        $el.removeClass(opts.focusClass);
        if (this.value === "") {
          $($el.val($el.attr("placeholder"))).addClass(opts.activeClass);
        }
      });
      $el.triggerHandler("blur");
      $el.parents("form").submit(function() {
        $el.triggerHandler("focus.placeholder");
      });
    });
  };
})(jQuery);
