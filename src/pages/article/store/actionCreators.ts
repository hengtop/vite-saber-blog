/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-05 13:26:26
 */

import * as actionTypes from './constant';
import { getArticleById } from '@/network/api/article';
import { getCommentListByArticleId } from '@/network/api/comment';
import { awaitHandle } from '@/utils/awaitHandle';
import type { ActionType } from '@/store/types';

export const changeArticleInfoAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLEINFO,
  value: res,
});

export const changeCommentListAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_COMMENT_LIST,
  value: res,
});

export const changeArticleDetailLoadingAction = (res: boolean): ActionType => ({
  type: actionTypes.CHANGE_ARTICLE_DETAIL_LOADING,
  value: res,
});

export const getArticleInfoByIdAction = (id: number | string) => {
  return async (dispatch: any) => {
    dispatch(changeArticleDetailLoadingAction(true));
    const [data, err] = await awaitHandle(getArticleById(id));
    if (data) {
      dispatch(changeArticleInfoAction(data.data));
      dispatch(changeCommentListAction(data.data.comments ?? []));
    }
    dispatch(changeArticleDetailLoadingAction(false));
  };
};

export const getCommentListByArticleIdAction = (id: number) => {
  return async (dispatch: any) => {
    const [data, err] = await awaitHandle(getCommentListByArticleId(id));
    if (data) {
      dispatch(changeCommentListAction(data.data));
    }
  };
};
