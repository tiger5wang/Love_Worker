import { webHeader } from '../../../services/home';

export default {
  namespace: 'header',
  state: {
    code: 0,
    ID: 0,
    name:''
  },
  effects: {
    * getWebHeader({ payload, callback }, { call, put }) {
      const response = yield call(webHeader, payload);

        yield put({
          type: 'show',
          payload: response,
        });
      }
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
