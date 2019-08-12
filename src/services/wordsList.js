import proxyRequest from '../utils/request'

export async function getWordsLists(params) {
  return proxyRequest.post('/users/web_get_context/',  params)
}

export async function getDataListsInfo(params) {
  return proxyRequest.post('/users/get_id_dataInfo/',  params)
}
