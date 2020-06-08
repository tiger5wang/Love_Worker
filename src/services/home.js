import proxyRequest from '../utils/request'
import qs from 'qs';
import request from '../utils/request'


export async function directorList(params) {
  return proxyRequest.get('/users/get_mulu/', params);
}

// 请求网站header
export async function webHeader(params) {
  return proxyRequest.get('/users/get_web_name/', params);
}
// create user uid
// export async function createUserUid(params) {
//   return proxyRequest.post('/Api/setask/', params);
// }


export async function createUserUid(params) {
  console.log('params.formData',JSON.stringify(params.formData))
  return request('/Api/setask', {
    method: 'post',
    body: params.formData,
  });
}

export async function getDataListsInfo(params) {
  return proxyRequest.post('/users/get_id_dataInfo/',  params)
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

// 获取视频列表
export async function GetMvDataList(params) {
  return proxyRequest.get('/users/get_mv_list/', params);
}

// 获取聊天实战
export async function GetLioatianList(params) {
  return proxyRequest.get('/users/get_img_liao/', params);
}

// 获取文章详情
export async function GetContextInfo(params) {
  return proxyRequest.get('/users/web_get_contextInfo/', params);
}

// 聊天机器人
export async function GetLiaoTianJQR(params) {
  return proxyRequest.get('/users/jiqiren/', params);
}

// 获取实战聊天
export async function GetContextLiaoInfo(params) {
  return proxyRequest.get('/users/web_get_liaotian_contextInfo/', params);
}



export async function GetWebSettingInfoTwo(params) {
  return proxyRequest.get('/users/web_get_setting_infotwo/', params);
}
