import url from './url.js'
import axios from './axios.conf.js'

export function getUInfoDetail (params) {
  return axios.get(url.getUInfoDetail, params)
}
export function bindPhone (params) {
  return axios.post(url.bindPhone, params)
}
export function bindPhoneCode (params) {
  return axios.post(url.bindPhoneCode, params)
}
export function bindEmail (params) {
  return axios.post(url.bindEmail, params)
}
export function getUserInfoEth (params) {
  return axios.get(url.userInfoEth, params)
}
export function userInfoEth (params) {
  return axios.post(url.userInfoEth, params)
}
export function getUserInfo (params) {
  return axios.get(url.userInfo, params)
}
export function userInfo (params) {
  return axios.post(url.userInfo, params)
}
export function login (params) {
  return axios.post(url.login, params)
}
export function loginMobile (params) {
  return axios.post(url.login_mobile, params)
}
export function sendSms (params) {
  return axios.post(url.send_sms, params)
}
export function mailReg (params) {
  return axios.post(url.mail_reg)
}
export function mailResult (key) {
  return axios.get(`${url.mail_result}${key}`)
}
export function banner () {
  return axios.get(url.banner)
}
