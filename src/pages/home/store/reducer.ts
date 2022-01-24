/*
 * @Date: 2022-01-24 16:51:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 16:58:30
 */
import { Map } from 'immutable';
import * as actionTypes from './constant';
import type { actionType } from '@/store/types';

const initState = Map({
  articleList: []
});

export default function (state = initState, action: actionType) {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLE:
      return state.set('articleList', action.value);
    default:
      return state;
  }
}
