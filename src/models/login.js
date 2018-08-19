import { routerRedux } from 'dva/router';
import { userlogin } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: '0',
    message: '登录成功',
    data: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(userlogin, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      const { status } = response;
      if (status === 0) {
        yield put(routerRedux.push('/device'));
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
