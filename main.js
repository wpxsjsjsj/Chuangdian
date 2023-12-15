import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'

//封装的接口请求
import {myRequest} from './util/api.js'
import {BASE_URL} from './util/api.js'
import {myUpLoadFile} from './util/api.js'

export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$myRequest = myRequest;
  app.config.globalProperties.$BASE_URL = BASE_URL;
  app.config.globalProperties.$myUpLoadFile = myUpLoadFile;
  
  return {
    app
  }
}
// #endif