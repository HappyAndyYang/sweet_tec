import { routerRedux } from 'dva/router';
import { getdevices, adddevices } from '../services/api';

export default {
  namespace: 'devices',

  state: {
    status: 1,
    message: '请求成功',
    data: {
      list: [],
      currentPage: 1,
      pageSize: 10,
    },
    modalFlag: false,
  },

  effects: {
    *getDevices({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getdevices, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addDevices({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(adddevices, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updateDevice({ payload }, { put }) {
      console.log(payload);
      yield put({
        type: 'save',
        payload,
      });
    },
    *back(_, { put }) {
      yield put(routerRedux.goBack());
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
