/*
 * @Date: 2022-01-24 16:51:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-20 18:18:56
 */
import { Map } from 'immutable';
import * as actionTypes from './constant';
import type { ActionType } from '@/store/types';

const initState = Map({
  articleInfo: {} as any,
  articleDetailLoading: false
});

export default function (state = initState, action: ActionType) {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLEINFO:
      return state.set('articleInfo', action.value);
    case actionTypes.CHANGE_ARTICLE_DETAIL_LOADING:
      return state.set('articleDetailLoading', action.value);
    default:
      return state;
  }
}
