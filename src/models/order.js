import { routerRedux } from 'dva/router';
import { order } from '../services/api';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
now.setDate(now.getDate() + 1);
export default {
  namespace: 'order',

  state: {
    status: '0',
    message: '请求成功',
    dpValue: now,
    nowTime: now,
    data: {},
  },

  effects: {
    *order({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(order, payload);
      console.log(response);
      const { status } = response;
      yield put({
        type: 'save',
        payload: response,
      });
      if (!status) {
        yield put(routerRedux.push('/login/sucess'));
      }
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
