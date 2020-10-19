
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tian = factory(global.Vue));
}(this, (function (vue) { 'use strict';

  var script = {
    name: 'App'
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", null, " hello Vue "))
  }

  script.render = render;
  script.__file = "src/App.vue";

  script.install = function (Vue) {
    Vue.component(script.name, script);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    script.install(window.Vue);
  }

  return script;

})));
