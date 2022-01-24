/*
 * @Date: 2022-01-24 16:48:56
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 18:03:31
 */
import { Record } from 'immutable';
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '@/pages/home/store';

const reducer = combineReducers({
  home: homeReducer
});
export type AppState = Record<ReturnType<typeof reducer>>;
export default reducer;
