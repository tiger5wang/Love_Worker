import proxyRequest from '../utils/request'


export async function directorList(params) {
  return proxyRequest.get('/users/get_mulu/', params);
}

// 请求网站header
export async function webHeader(params) {
  return proxyRequest.get('/users/get_web_name/', params);
}

// Search话术
export async function searchWebdata(params) {
  return proxyRequest.get('/users/filter_huashu/', params);
}


// 用户注册
export async function registerUserInfo(params) {
  return proxyRequest.get('/users/register_user/', params);
}
// 用户登录
export async function loginUserInfo(params) {
  return proxyRequest.get('/users/web_login_user/', params);
}


export async function GetUserInfo(params) {
  return proxyRequest.get('/users/web_get_user_info/', params);
}

// 获取文章列表
export async function GetCeontextList(params) {
  return proxyRequest.get('/users/web_context_list/', params);
}


// 获取文章详情
export async function GetContextInfo(params) {
  return proxyRequest.get('/users/web_get_contextInfo/', params);
}

// 获取会员介绍，微信客服
export async function GetWebSettingInfo(params) {
  return proxyRequest.get('/users/web_get_setting_info/', params);
}

export async function GetWebSettingInfoTwo(params) {
  return proxyRequest.get('/users/web_get_setting_infotwo/', params);
}
