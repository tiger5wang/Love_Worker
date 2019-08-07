import { searchWebdata } from '../../../services/home';

export default {
  namespace: 'searchData',
  state: {
    data:[],
    code:0,
    message:''
  },
  effects: {
    * postSearchData({ payload }, { call, put }) {
      const response = yield call(searchWebdata, payload);
      console.log(JSON.stringify(response))

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
