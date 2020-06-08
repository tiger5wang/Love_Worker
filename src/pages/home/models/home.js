import { createUserUid } from '../../../services/home';

export default {
  namespace: 'home',
  state: {
    directorList: [],
  },
  effects: {
    * getDirectorList({ payload, callback }, { call, put }) {
      const response = yield call(createUserUid, payload);
      console.log(JSON.stringify(payload))
        console.log(JSON.stringify(response))
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
