/*
 * @Date: 2022-01-24 16:51:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 16:01:35
 */
import { Map } from 'immutable';
import * as actionTypes from './constant';
import type { ActionType } from '@/store/types';

const initState = Map({
  articleList: [],
  articleTotalCount: 0,
  queryInfo: {} as any //获取文章的query
});

export default function (state = initState, action: ActionType) {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLE:
      return state.set('articleList', action.value);
    case actionTypes.CHANGE_ARTICLE_COUNT:
      return state.set('articleTotalCount', action.value);
    case actionTypes.CHANGE_QUERY:
      return state.set('queryInfo', action.value);
    default:
      return state;
  }
}
