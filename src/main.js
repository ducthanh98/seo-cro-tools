import Vue from 'vue'
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'
import VueGrapesjs from "./plugins/grapesjs";
import 'element-ui/lib/theme-chalk/index.css';
import 'grapesjs/dist/css/grapes.min.css';
import App from './App.vue'
import router from "./router";
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueGrapesjs);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
