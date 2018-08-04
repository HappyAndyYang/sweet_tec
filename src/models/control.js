import { routerRedux } from 'dva/router';
import { getdevices, getdeviceDetail, savedeviceDetail } from '../services/api';

export default {
  namespace: 'control',

  state: {
    status: 1,
    message: '请求成功',
    data: {
      button: [],
      lbutton: [],
      checkbox: [],
      video: [],
    },
    popoVisible: false,
    popoSelected: '',
    modalsVisible: false,
    checkedFlag: [],
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
    *getdeviceDetail({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(getdeviceDetail, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *savedeviceDetail({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(savedeviceDetail, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put(routerRedux.goBack());
    },
    *saveComponents({ payload }, { /* call, */ put }) {
      const test = {
        status: 0,
        message: '请求成功',
        data: payload,
      };
      yield put({
        type: 'save',
        payload: test,
      });
    },
    *popoVisibleSave({ payload }, { put }) {
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
