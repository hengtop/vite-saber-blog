/*
 * @Date: 2022-01-24 16:51:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-21 20:51:37
 */
import { Map } from 'immutable';
import * as actionTypes from './constant';
import type { ActionType } from '@/store/types';

const initState = Map({
  articleInfo: {} as any,
  commentList: [],
  commentListTotalCount: 0,
  articleDetailLoading: false,
});

export default function (state = initState, action: ActionType) {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLEINFO:
      return state.set('articleInfo', action.value);
    case actionTypes.CHANGE_ARTICLE_DETAIL_LOADING:
      return state.set('articleDetailLoading', action.value);
    case actionTypes.CHANGE_COMMENT_LIST:
      return state.set('commentList', action.value);
    case actionTypes.CHANGE_COMMENT_LIST_TOTAL_COUNT:
      return state.set('commentListTotalCount', action.value);
    default:
      return state;
  }
}
