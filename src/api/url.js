let remoteServer = 'http://47.74.158.5:8889'
//  http://localhost:8889/project/list?status=BEING&page=0&size=8
if (process.env === 'production') {
  remoteServer = 'www.wellico.io/api'
}
export default {
  'remoteServer': remoteServer,
  'getUInfoDetail': remoteServer + '/user/info/detail',
  'bindPhone': remoteServer + '/user/info/phone/bind/valid',
  'bindPhoneCode': remoteServer + '/user/info/phone/bind ',
  'bindEmail': remoteServer + '/user/info/email/bind',
  'userInfoEth': remoteServer + '/user/info/eth',
  'userInfo': remoteServer + '/user/info',
  'get_detail': remoteServer + '/project/info/',
  'login': remoteServer + '/auth',
  'login_mobile': remoteServer + '/auth/mobile',
  'send_sms': remoteServer + '/auth/sendSms',
  'mail_reg': remoteServer + '/auth/register',
  'mobile_reg':remoteServer + '/auth/register/sendSms',
  'mobile_pwd':remoteServer + '/auth/register/mobile',
  'mail_result': remoteServer + '/auth/email/',
  'banner': remoteServer + '/project/banner',
  'userInfoList': remoteServer + '/user/info/list',
  'porjectsearch':remoteServer + '/project/search',
  'findpwd':remoteServer +'/auth/findPwd'
}
