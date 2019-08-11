import { GetCeontextList } from '../../../services/home';

export default {
  namespace: 'PostDataList',
  state: {
    directorList: [],
  },
  effects: {
    * getContextList({ payload, callback }, { call, put }) {
      const response = yield call(GetCeontextList, payload);
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
