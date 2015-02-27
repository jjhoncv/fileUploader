(function($) {
  var MutationObserver, attrchangeFx, checkAttributes, isDOMAttrModifiedSupported;
  isDOMAttrModifiedSupported = function() {
    var flag, p;
    p = document.createElement("p");
    flag = false;
    if (p.addEventListener) {
      p.addEventListener("DOMAttrModified", (function() {
        flag = true;
      }), false);
    } else if (p.attachEvent) {
      p.attachEvent("onDOMAttrModified", function() {
        flag = true;
      });
    } else {
      return false;
    }
    p.setAttribute("id", "target");
    return flag;
  };
  checkAttributes = function(chkAttr, e) {
    var attributes, keys;
    if (chkAttr) {
      attributes = this.data("attr-old-value");
      if (e.attributeName.indexOf("style") >= 0) {
        if (!attributes["style"]) {
          attributes["style"] = {};
        }
        keys = e.attributeName.split(".");
        e.attributeName = keys[0];
        e.oldValue = attributes["style"][keys[1]];
        e.newValue = keys[1] + ":" + this.prop("style")[$.camelCase(keys[1])];
        attributes["style"][keys[1]] = e.newValue;
      } else {
        e.oldValue = attributes[e.attributeName];
        e.newValue = this.attr(e.attributeName);
        attributes[e.attributeName] = e.newValue;
      }
      this.data("attr-old-value", attributes);
    }
  };
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  $.fn.attrchange = function(a, b) {
    if (typeof a === "object") {
      return attrchangeFx._core.call(this, a);
    } else {
      if (typeof a === "string") {
        return attrchangeFx._ext.call(this, a, b);
      }
    }
  };
  attrchangeFx = {
    _core: function(o) {
      var cfg, mOptions, observer;
      cfg = {
        trackValues: false,
        callback: $.noop
      };
      if (typeof o === "function") {
        cfg.callback = o;
      } else {
        $.extend(cfg, o);
      }
      if (cfg.trackValues) {
        this.each(function(i, el) {
          var attr, attributes, attrs, l;
          attributes = {};
          attr = void 0;
          i = 0;
          attrs = el.attributes;
          l = attrs.length;
          while (i < l) {
            attr = attrs.item(i);
            attributes[attr.nodeName] = attr.value;
            i++;
          }
          $(this).data("attr-old-value", attributes);
        });
      }
      if (MutationObserver) {
        mOptions = {
          subtree: false,
          attributes: true,
          attributeOldValue: cfg.trackValues
        };
        observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(e) {
            var _this;
            _this = e.target;

            /**
            @KNOWN_ISSUE: The new value is buggy for STYLE attribute as we don't have
            any additional information on which style is getting updated.
             */
            if (cfg.trackValues) {
              e.newValue = $(_this).attr(e.attributeName);
            }
            cfg.callback.call(_this, e);
          });
        });
        return this.data("attrchange-method", "Mutation Observer").data("attrchange-obs", observer).each(function() {
          observer.observe(this, mOptions);
        });
      } else if (isDOMAttrModifiedSupported()) {
        return this.data("attrchange-method", "DOMAttrModified").on("DOMAttrModified", function(event) {
          if (event.originalEvent) {
            event = event.originalEvent;
          }
          event.attributeName = event.attrName;
          event.oldValue = event.prevValue;
          cfg.callback.call(this, event);
        });
      } else if ("onpropertychange" in document.body) {
        return this.data("attrchange-method", "propertychange").on("propertychange", function(e) {
          e.attributeName = window.event.propertyName;
          checkAttributes.call($(this), cfg.trackValues, e);
          cfg.callback.call(this, e);
        });
      }
      return this;
    },
    _ext: function(s, o) {
      switch (s) {
        case "disconnect":
          return this.each(function() {
            var attrchangeMethod;
            attrchangeMethod = $(this).data("attrchange-method");
            if (attrchangeMethod === "propertychange" || attrchangeMethod === "DOMAttrModified") {
              $(this).off(attrchangeMethod);
            } else {
              if (attrchangeMethod === "Mutation Observer") {
                $(this).data("attrchange-obs").disconnect();
              }
            }
          }).removeData("attrchange-method");
      }
    }
  };
})(jQuery);
