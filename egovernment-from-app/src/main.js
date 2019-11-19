import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueFirestore from 'vue-firestore';
import './../node_modules/bulma/css/bulma.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationTriangle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueFirestore);
Vue.use(VueRouter)
import Form from "./components/Form.vue" 
import Report from "./components/Report.vue"

const routes = [
  { path: '/', component: Form },
  { path: '/report', component: Report }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
