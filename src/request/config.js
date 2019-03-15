import Vue from 'vue'
import axios from 'axios'
import queryString from 'querystring'

const urlStr = '/'
const Http = axios.create({
  baseURL: urlStr,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [function (data) {
    return queryString.stringify(data);
  }],
});

Http.interceptors.request.use(function (config) {
  // 设置全局token
  const AUTH_TOKEN = window.sessionStorage.getItem('token')
  config.headers.common['token'] = AUTH_TOKEN;
  return config;
}, function (error) {

  return Promise.reject(error);
})

// 响应拦截器
Http.interceptors.response.use(function (response) {


  return response;
}, function (error) {


  return Promise.reject(error);
})

Vue.prototype.axios = Http
Vue.prototype.axiosUrl = urlStr

export default Http;
