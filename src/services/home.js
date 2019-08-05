import proxyRequest from '../utils/request'


export async function directorList(params) {
  return proxyRequest.get('/users/get_mulu/', params);
}
