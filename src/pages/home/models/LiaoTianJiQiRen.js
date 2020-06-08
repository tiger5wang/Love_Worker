import { GetLiaoTianJQR } from '../../../services/home';

export default {
  namespace: 'LiaoTianRen',
  state: {
    directorList: [],
  },
  effects: {
    * postLiaoTian({ payload, callback }, { call, put }) {
      const response = yield call(GetLiaoTianJQR, payload);
      if (response && response.code === 200) {
        callback && callback(response);
        yield put({
          type: 'directorList',
          payload: response.data,
        });
      } else {

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
