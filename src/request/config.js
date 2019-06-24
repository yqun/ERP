import Vue from 'vue'
import axios from 'axios'
import queryString from 'querystring'

// const urlStr = 'http://10.1.0.142:8080/platformServer/'
// const urlStr = 'http://10.1.0.225:8081/platformServer/'
const urlStr = 'http://imp.kingtop.com.cn:8080/platformServer/'

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
  const AUTH_TOKEN = JSON.parse(window.sessionStorage.getItem('data'))
  if (!AUTH_TOKEN) return config;
  config.headers.common['loginName'] = AUTH_TOKEN.loginName;
  config.headers.common['password'] = AUTH_TOKEN.password;
  config.headers.common['id'] = AUTH_TOKEN.id;
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
