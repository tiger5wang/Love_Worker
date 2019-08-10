import { GetWebSettingInfoTwo, GetWebSettingInfo} from '../../../services/home';

export default {
  namespace: 'SettingsInfo',
  state: {
    userInfo:"",
  },
  effects: {
     * postSettingsInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetWebSettingInfo, payload);

      if (response && response.code === 200) {
        callback && callback(response);}
        yield put({
          type: 'userInfo',
          payload: response.data
        })
    },

     * getSettingsInfo({ payload, callback }, { call, put }) {
      const response = yield call(GetWebSettingInfoTwo, payload);

      if (response && response.code === 200) {
        callback && callback(response);}
        yield put({
          type: 'userInfo',
          payload: response.data
        })
    },
  },
  reducers: {
    userInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    }
  },
}
