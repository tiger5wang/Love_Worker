import { directorList } from '../../../services/home';

export default {
  namespace: 'home',
  state: {
    directorList: [],
  },
  effects: {
    * getDirectorList({ payload, callback }, { call, put }) {
      const response = yield call(directorList, payload);
      if (response && response.code === 200) {
        callback && callback(response.data);
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
