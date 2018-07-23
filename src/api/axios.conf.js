// import { Message} from 'element-ui'
import axios from 'axios'
//  import qs from 'qs'
axios.interceptors.request.use(function (config) {
  document.body.classList.add('wait')
  //  if (config.method === 'post') {
  //    config.data = qs.stringify(config.data)
  //  }
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  document.body.classList.remove('wait')
  // if (Number(response.data.code) === 4001) {
  //   window.location.href = '/'
  // }
  // else if (Number(response.data.code) === 4002) {
  //   window.location.href = '/user/login'
  // }
  // Message({
  //   message: response.status,
  //   type: 'warning'
  // })
  return response
}, function (error) {
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 401:
  //       // 返回 401 清除token信息并跳转到登录页面
  //       store.commit(types.LOGOUT);
  //       router.replace({
  //         path: 'login',
  //         query: {redirect: router.currentRoute.fullPath}
  //       })
  //   }
  // }
  // Do something with response error
  return Promise.reject(error)
})

export default axios
