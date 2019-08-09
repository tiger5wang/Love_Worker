import { GetUserInfo, } from '../../../services/home';
import router from 'umi/router';
import {Toast} from 'antd-mobile';

export default {
  namespace: 'UserInfo',
  state: {
    username:"",
    userType:"",
    message:"",
    code:0,
    token:"",
    create_time:""},
  effects: {
     * postUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetUserInfo, payload);

      if (response && response.code === 200) {
        callback && callback(response);}

    },

     reducers: {
        show(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
  }
}
