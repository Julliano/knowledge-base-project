import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import App from './App';


import './config/bootstrap';
import store from './config/store';
import router from './config/router';

Vue.config.productionTip = false;

// TEMP
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6Ikp1bGxpYW5vIiwiZW1haWwiOiJqdWxsaWFub0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY1MjA2MjE2LCJleHAiOjE1NjU0NjU0MTZ9.3EITNjLoFSeFK2FIQAWfBoDXw4PqTRQfb_GPrnDR0A8';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');