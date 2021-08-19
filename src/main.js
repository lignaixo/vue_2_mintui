import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI);

//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.prototype.axios = axios;

// 引入moment
import moment from 'moment'
Vue.prototype.moment = moment;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
