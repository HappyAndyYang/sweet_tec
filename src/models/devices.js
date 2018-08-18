import { routerRedux } from 'dva/router';
import { getdevices, addevices, delDevices } from '../services/api';

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
      const response = yield call(getdevices, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addDevices({ payload }, { call, put }) {
      const response = yield call(addevices, payload);
      response.modalFlag = false;
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'getDevices',
      });
    },
    *updateDevice({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *delectDevice({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(delDevices, payload);
      yield put({
        type: 'save',
        payload: response,
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
