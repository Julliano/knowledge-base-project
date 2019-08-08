import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';

import App from './App';

import './config/bootstrap';
import './config/msgs';
import store from './config/store';
import router from './config/router';

Vue.config.productionTip = false;

// TEMP
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6Ikp1bGxpYW5vIiwiZW1haWwiOiJqdWxsaWFub0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTY1MjkyNDE5LCJleHAiOjE1NjU1NTE2MTl9.bkvNTqdYDo-QezxWNDf0T7Wdy_m1KUpcQd0n87Bu8nY';

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');