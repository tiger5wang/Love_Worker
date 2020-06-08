import { loginUserInfo, } from '../../../services/home';
import router from 'umi/router';

export default {
  namespace: 'LoginModalUser',
  state: {
    directorList: [],
  },
  effects: {
    * postLogin({ payload, callback }, { call, put }) {
      const response = yield call(loginUserInfo, payload);
      if (response && response.code === 200) {
        callback && callback(response);
      }
    },
  },


  reducers: {
    directorList(state, { payload }) {
      return {
        ...state,
        directorList: payload,
      };
    },
  },
};
