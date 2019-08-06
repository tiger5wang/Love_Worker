import {directorList} from '../../../services/home'

export default {
  namespace: 'home',
  state: {
    directorList: []
  },
  effects: {
    * getDirectorList({ payload, callback }, { call, put }) {
      const response = yield call(directorList, payload);
      console.log(response)
      if(response && response.code === 200) {
        callback && callback(response.data)
        yield put({
          type: 'directorList',
          payload: response.data
        });
      } else {
        alert(response.description)
      }
    }
  },
  reducers: {
      directorList(state, { payload }) {
      return {
        ...state,
        directorList: payload,
      }
    }
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, search }) => {
  //       if (pathname === '/home' || pathname === '/') {
  //         dispatch({
  //           type: 'directorList',
  //           payload: {
  //             username: '18635708174',
  //             password: '123456',
  //           }
  //         });
  //       }
  //     });
  //   },
  // },
};
