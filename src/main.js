import App from './App.vue'

App.install = function(Vue) {
  Vue.component(App.name, App)
}

if (typeof window !== 'undefined' && window.Vue) {
  App.install(window.Vue);
}

export default App