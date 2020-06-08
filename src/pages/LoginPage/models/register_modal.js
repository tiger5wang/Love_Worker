import { registerUserInfo, } from '../../../services/home';
import router from 'umi/router';

export default {
  namespace: 'RegisterModalUser',
  state: {
    directorList: [],
  },
  effects: {
    * postRegister({ payload, callback }, { call, put }) {
      const response = yield call(registerUserInfo, payload);
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
