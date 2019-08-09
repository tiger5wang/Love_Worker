import { directorList } from '../../../services/home';
import { GetUserInfo } from '@/services/home';

export default {
  namespace: 'profileCenter',
  state: {
    directorList: [],
  },
  effects: {
    * postUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetUserInfo, payload);

      if (response && response.code === 200) {
        callback && callback(response);}

    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
