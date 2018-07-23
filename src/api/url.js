let remoteServer = 'https://www.wellico.io/api'
if (process.env === 'production') {
  remoteServer = 'http://www.wellico.io/api'
}
localStorage.setItem('server', remoteServer)
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
  'bind_mail_result': remoteServer + '/user/info/email/bind/',
  'reset_pwd_result': remoteServer + '/auth/resetPwd',
  'banner': remoteServer + '/project/banner',
  'userInfoList': remoteServer + '/user/info/list',
  'porjectsearch':remoteServer + '/project/search',
  'findpwd':remoteServer +'/auth/findPwd'
}
