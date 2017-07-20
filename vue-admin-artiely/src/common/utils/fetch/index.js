//导入模块
import axios from 'axios'
import {port_code} from '@/api/config'
import router from '@/router'
import {Message} from 'iview'
import store from '@/store'
//import {SET_USER_INFO} from 'store/actions/type'
import {server_base_url} from '@/api/config'

//设置用户信息action
/*const setUserInfo = function (user) {
 //store.dispatch(SET_USER_INFO, user)
 };*/

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置
      timeout: 5000,
      //设置请求时的header
      headers: {}
    })
    //请求处理
    instance(options)
      .then((res) => {
        //请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
         resolve({code, msg, data})
         return false
         } else if (code === port_code.unlogin) {
         setUserInfo(null)
         router.replace({name: "login"})
         }*/
        resolve(res.data)
        return false
        // Message.warning(msg)
        // reject({code, msg, data})
      })
      .catch((error) => {
        //请求失败时,根据业务判断状态
        if (error.response) {
          let resError = error.response
          let resCode = resError.status
          let resMsg = error.message
          Message.error('操作失败！错误原因 ' + resMsg)
          reject({code: resCode, msg: resMsg})
        }
      })
  })
}
