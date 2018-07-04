import axios from 'axios'
//  import qs from 'qs'
axios.interceptors.request.use(function (config) {
  document.body.classList.add('wait')
  //  if (config.method === 'post') {
  //    config.data = qs.stringify(config.data)
  //  }
  let token = sessionStorage.getItem('token')
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
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default axios
