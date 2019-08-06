// import fetch from 'dva/fetch';
import axios from 'axios'
import { Toast } from 'antd-mobile';
import { setUrlEncoded,setFormData } from './baseServer';
import {Storage} from './index'
import {sk_user_token} from '../config/StorageKeys'
import router from 'umi/router';
import {UrlConfig} from '../config/config'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    const { data: result } = response;
    // console.log('response-->', JSON.stringify(response.data))
    if (response.status) {
      // console.log('--->', codeMessage[response.status])
      if (response.status >= 200 && response.status < 300) {
        response.success = true; //eslint-disable-line
        return result;
      }
      const error = new Error(result);
      response.success = false;
      error.result = response;
      throw error;
    }
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  // body 添加token
  if (newOptions.body) {
    newOptions.body.__token__ =  await Storage.get(sk_user_token);
  } else {
    newOptions.body = {
      __token__: await Storage.get(sk_user_token),
    };
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (newOptions.contentType === 'application/json') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (newOptions.contentType === 'formData') {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.data = { ...newOptions.body };
    }
  } else if (newOptions.method === 'GET') {
    newOptions.params = { ...newOptions.body };
    // new_url = url + '?' + setUrlEncoded(newOptions.body)
    delete newOptions.body
  }
  console.log('request_params', newOptions)
  return axios
    .create()
    .request({
      url: UrlConfig.base_url + url,
      timeout: 30000,
      ...newOptions,
    })
    .then((res) => {
      console.log('request_response', res)
      return checkStatus(res)
    })
    .catch(error => {
      const { response } = error;

      if ('stack' in error && 'message' in error) {
        const { message } = error;
        if (!message.indexOf('timeout')) {
          Toast.fail('请求超时, 请稍后再试')
        } else if(!message.indexOf('Network')){
          Toast.fail('暂无网络，请检查网络')
        } else {
          const { status } = response;

          if (status === 401) {
            console.log('401 auto logout')
            // NavigatorHelper.navigation.navigate('Auth')
            Toast.info('授权已过期, 请重新登录')

          } else {
            // Alert.alert(`请求错误`, status ? codeMessage[status] : '')
            Toast.fail(status ? codeMessage[status] : '请求错误', 3)
          }
          // else if (status === 403) {
          //
          //     // router.push('/exception/403');
          // } else if (status <= 504 && status >= 500) {
          //     // router.push('/exception/500');
          // } else if (status >= 404 && status < 422) {
          //     // router.push('/exception/404');
          // }
          return {
            message: `请求错误`,
            description: codeMessage[status],
            data: null,
            code: status
          };
        }
      }
      return {
        message: `请求错误`,
        description: error.message,
        data: null,
        code: 404
      };
    });

  // return fetch(new_url, newOptions)
  //   .then(checkStatus)
  //   .then((response) => {
  //     return response.json();
  //   });
}

/**
 *  the proxy of request
 * @param url
 * @param options
 * @returns {*}
 */
function proxyRequest(url, options, showError = true) {
  options = options || {};
  return request(url, options)
  //   .then((response) => {
  //
  //   console.log('request_request.then', response)
  //   if (response && response.token) {
  //     Storage.set(sk_user_token,response.token);
  //   }
  //   if (response.err_code === -1 || response.code === 1) {
  //     // return response.data || {};
  //     return response || {};
  //   }
  //   if (showError) {
  //     if (response.code !== 403){
  //       Toast.fail(response.msg, 1)
  //     }
  //   }
  //   const e = new Error();
  //   e.code = response.code;
  //   e.message = response.message || `Failed to get data code : ${e.code}`;
  //   throw e;
  // })
  //   .catch((e,url) => {
  //   console.log(e,'errrr')
  //   const status = e.code;
  //   if (status === 401) {
  //     // @HACK
  //     /* eslint-disable no-underscore-dangle */
  //     window.g_app._store.dispatch({
  //       type: 'login/logout',
  //     });
  //     return;
  //   }
  //   if (status === 403) {
  //     router.push('/login');
  //     return;
  //   }
  //   if (status <= 504 && status >= 500) {
  //     // router.push('/login');
  //     return;
  //   }
  //   if (status >= 404 && status < 422) {
  //     // router.push('/404');
  //     return;
  //   }
  // });
}

proxyRequest.get = (url, data, options, showError) => {
  options = options || {};
  options.body = data || {};
  options.method = 'GET';
  return proxyRequest(url, options, showError);
};

proxyRequest.post = (url, data, options, showError) => {
  options = options || {};
  options.body = data || {};
  options.method = 'POST';
  return proxyRequest(url, options, showError);
};

proxyRequest.put = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'PUT';
  return proxyRequest(url, options);
};

proxyRequest.delete = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'DELETE';
  return proxyRequest(url, options);
};

export default proxyRequest;
