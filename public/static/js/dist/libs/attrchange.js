!function($){var MutationObserver,attrchangeFx,checkAttributes,isDOMAttrModifiedSupported;isDOMAttrModifiedSupported=function(){var flag,p;if(p=document.createElement("p"),flag=!1,p.addEventListener)p.addEventListener("DOMAttrModified",function(){flag=!0},!1);else{if(!p.attachEvent)return!1;p.attachEvent("onDOMAttrModified",function(){flag=!0})}return p.setAttribute("id","target"),flag},checkAttributes=function(chkAttr,e){var attributes,keys;chkAttr&&(attributes=this.data("attr-old-value"),e.attributeName.indexOf("style")>=0?(attributes.style||(attributes.style={}),keys=e.attributeName.split("."),e.attributeName=keys[0],e.oldValue=attributes.style[keys[1]],e.newValue=keys[1]+":"+this.prop("style")[$.camelCase(keys[1])],attributes.style[keys[1]]=e.newValue):(e.oldValue=attributes[e.attributeName],e.newValue=this.attr(e.attributeName),attributes[e.attributeName]=e.newValue),this.data("attr-old-value",attributes))},MutationObserver=window.MutationObserver||window.WebKitMutationObserver,$.fn.attrchange=function(a,b){return"object"==typeof a?attrchangeFx._core.call(this,a):"string"==typeof a?attrchangeFx._ext.call(this,a,b):void 0},attrchangeFx={_core:function(o){var cfg,mOptions,observer;return cfg={trackValues:!1,callback:$.noop},"function"==typeof o?cfg.callback=o:$.extend(cfg,o),cfg.trackValues&&this.each(function(i,el){var attr,attributes,attrs,l;for(attributes={},attr=void 0,i=0,attrs=el.attributes,l=attrs.length;l>i;)attr=attrs.item(i),attributes[attr.nodeName]=attr.value,i++;$(this).data("attr-old-value",attributes)}),MutationObserver?(mOptions={subtree:!1,attributes:!0,attributeOldValue:cfg.trackValues},observer=new MutationObserver(function(mutations){mutations.forEach(function(e){var _this;_this=e.target,cfg.trackValues&&(e.newValue=$(_this).attr(e.attributeName)),cfg.callback.call(_this,e)})}),this.data("attrchange-method","Mutation Observer").data("attrchange-obs",observer).each(function(){observer.observe(this,mOptions)})):isDOMAttrModifiedSupported()?this.data("attrchange-method","DOMAttrModified").on("DOMAttrModified",function(event){event.originalEvent&&(event=event.originalEvent),event.attributeName=event.attrName,event.oldValue=event.prevValue,cfg.callback.call(this,event)}):"onpropertychange"in document.body?this.data("attrchange-method","propertychange").on("propertychange",function(e){e.attributeName=window.event.propertyName,checkAttributes.call($(this),cfg.trackValues,e),cfg.callback.call(this,e)}):this},_ext:function(s){switch(s){case"disconnect":return this.each(function(){var attrchangeMethod;attrchangeMethod=$(this).data("attrchange-method"),"propertychange"===attrchangeMethod||"DOMAttrModified"===attrchangeMethod?$(this).off(attrchangeMethod):"Mutation Observer"===attrchangeMethod&&$(this).data("attrchange-obs").disconnect()}).removeData("attrchange-method")}}}}(jQuery);