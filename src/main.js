import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import store from './store'
import i18n from './i18n'
import { sync } from 'vuex-router-sync'
import './plugins/vuetify-mask'
import outside from './directives/outside'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import VueMask from 'v-mask'
import filters from './plugins/filters'
import './plugins/perfect-scrollbar'

// Vue.use(VueAxios, axios)
Vue.use(VueMask, filters)
Vue.use(outside)

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  vuetify,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
