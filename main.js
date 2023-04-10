
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//网络请求包
import {$http} from "@escook/request-miniprogram"

import store from './store/store.js'

uni.$http = $http

$http.baseUrl = `https://api-hmugo-web.itheima.net`

$http.beforeRequest = function(options){
	uni.showLoading({
		title:"Loading..."
	})
}

uni.$showMsg= function(title = 'fail!' , duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

$http.afterRequest = function(){
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif