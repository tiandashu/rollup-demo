import {version} from '../package.json'
import JdwlDemo from '../packages/jdwl-demo/index.js'

const components = [
  JdwlDemo,
]

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component);
  })
  install.installed = true;
};


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: version,
  install,
  ...components
}