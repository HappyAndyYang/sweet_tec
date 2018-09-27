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
      const response = yield call(userlogin, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      const { status } = response;
      if (status === 0) {
        // localStorage.setItem('userId', response.userId);
        const str = JSON.stringify({
          userId: response.userId,
          loginTime: new Date(),
        });
        localStorage.setItem('login', str);
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
