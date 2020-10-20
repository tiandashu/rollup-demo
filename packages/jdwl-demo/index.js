import Main from './src/main.vue'

Main.install = function(Vue) {
  Vue.component(Main.name, Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  Main.install(window.Vue);
}

export default Main;