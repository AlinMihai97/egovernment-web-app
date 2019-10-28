import Vue from 'vue'
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

new Vue({
  render: h => h(App),
}).$mount('#app')
