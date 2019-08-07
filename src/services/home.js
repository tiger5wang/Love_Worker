import proxyRequest from '../utils/request'


export async function directorList(params) {
  return proxyRequest.get('/users/get_mulu/', params);
}

// 请求网站header
export async function webHeader(params) {
  return proxyRequest.get('/users/get_web_name/', params);
}
