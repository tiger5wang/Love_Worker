import { GetContextInfo } from '../../../services/home';

export default {
  namespace: 'postContext',
  state: {
    directorList: [],
  },
  effects: {
    * postContextInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetContextInfo, payload);
      console.log(JSON.stringify(response))
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
