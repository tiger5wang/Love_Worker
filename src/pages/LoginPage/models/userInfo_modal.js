import { GetUserInfo, } from '../../../services/home';

export default {
  namespace: 'UserInfo',
  state: {
    userInfo:"",
  },
  effects: {
     * postUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetUserInfo, payload);

      if (response && response.code === 200) {
        callback && callback(response);}
        yield put({
          type: 'userInfo',
          payload: response.data
        })
    },
  },
  reducers: {
    userInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    }
  },
}
