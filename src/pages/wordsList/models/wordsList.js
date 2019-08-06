import {getWordsLists} from '../../../services/wordsList'

export default {
  namespace: 'wordList',
  state: {
    wordsLists: []
  },
  effects: {
    *getWordsList({ payload, callback }, { call, put }) {
      const response = yield call(getWordsLists, payload);
      console.log('list', response);
      if(response.code === 200) {
        yield put({
          type: 'wordsLists',
          payload: response.data
        })
      } else {
        alert(response.description)
      }
    }
  },
  reducers: {
    wordsLists(state, {payload}) {
      return {...state, wordsLists: payload}
    }
  }



}
