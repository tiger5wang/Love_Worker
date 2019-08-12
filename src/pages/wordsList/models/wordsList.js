import {getWordsLists, getDataListsInfo} from '../../../services/wordsList'

export default {
  namespace: 'wordList',
  state: {
    wordsLists: [],
  },
  effects: {
    * getWordsList({ payload, callback }, { call, put }) {
      const response = yield call(getWordsLists, payload);
      if (response.code === 200) {
        yield put({
          type: 'wordsLists',
          payload: response.data,
        });
      } else {

      }
    },

    * getListInfo({ payload, callback }, { call, put }) {
      const response = yield call(getDataListsInfo, payload);
      if (response && response.code === 200) {
        callback && callback(response);
      }
      }


  },
  reducers: {
    wordsLists(state, {payload}) {
      return {...state, wordsLists: payload}
    }

  }



}
