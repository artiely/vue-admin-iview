// 导入模块
import Vue from 'vue'
import axios from 'axios'
import { SERVER_BASE_URL } from './config'
// import router from '@/router'
import iView, {Notice } from 'iview'
// import store from '@/store'
Vue.use(iView)
// 设置用户信息action
/* const setUserInfo = function (user) {
 //store.dispatch(SET_USER_INFO, user)
 }; */

export default function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      timeout: 5000,
      headers: {}
    })
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        iView.LoadingBar.start()
        // config.headers.Authorization = 'token'
        return config
      },
      err => {
        iView.LoadingBar.error()
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        iView.LoadingBar.finish()
        return response
      },
      error => {
        iView.LoadingBar.error()
        if (error) {
        }
        return Promise.reject(error) // 返回接口返回的错误信息
      })

    // 请求处理
    instance(options)
      .then((res) => {
        // 请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
         resolve({code, msg, data})
         return false
         } else if (code === port_code.unlogin) {
         setUserInfo(null)
         router.replace({name: "login"})
         } */

        resolve(res.data)
        return false
      })
      .catch((error) => {
        // 请求失败时,根据业务判断状态
        Notice.error({
          title: '出错了！',
          desc: '错误原因 ' + JSON.stringify(error),
          duration: 0
        })
        reject(error)
      })
  })
}
