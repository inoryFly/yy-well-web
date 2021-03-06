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
export function userInfoList (params) {
  return axios.post(url.userInfoList, params)
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
export function mobileReg (params) {
  return axios.post (url.mobile_reg,params)
}
export function mobilePwd (params) {
  return axios.post (url.mobile_pwd,params)
}
export function mailResult (key) {
  return axios.get(`${url.mail_result}${key}`)
}
export function bindResult (key) {
  return axios.get(`${url.bind_mail_result}${key}`)
}
export function resetResult (param) {
  return axios.post(`${url.reset_pwd_result}`, param)
}
export function banner () {
  return axios.get(url.banner)
}
export function porjectsearch(params){
  return axios.post (url.porjectsearch,params)
}
export function findpwd(params){
  return axios.post(url.findpwd,params)
}