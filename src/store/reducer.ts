/*
 * @Date: 2022-01-24 16:48:56
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-29 00:01:55
 */
import { Record, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import * as actionTypes from './constant';
import type { ActionType } from './types';

import { reducer as homeReducer } from '@/pages/home/store';

//总的reducer
const initState = Map({
  token: '',
  refreshToken: '',
  userId: '',
  userInfo: {} as any
});
const mainReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case actionTypes.CHANGE_TOKEN:
      return state.set('token', action.value);
    case actionTypes.CHANGE_REFRESHTOKEN:
      return state.set('refreshToken', action.value);
    case actionTypes.CHANGE_USERID:
      return state.set('userId', action.value);
    case actionTypes.CHANGE_USERINFO:
      return state.set('userInfo', action.value);
    default:
      return state;
  }
};

const reducer = combineReducers({
  home: homeReducer,
  main: mainReducer
});
export type AppState = Record<ReturnType<typeof reducer>>;
export default reducer;
