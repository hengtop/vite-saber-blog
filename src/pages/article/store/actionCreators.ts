/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-21 20:52:52
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

export const changeCommentListTotalCountAction = (res: boolean): ActionType => ({
  type: actionTypes.CHANGE_COMMENT_LIST_TOTAL_COUNT,
  value: res,
});

export const getArticleInfoByIdAction = (id: number | string) => {
  return async (dispatch: any) => {
    dispatch(changeArticleDetailLoadingAction(true));
    const [data, err] = await awaitHandle(getArticleById(id));
    if (data) {
      dispatch(changeArticleInfoAction(data.data));
    }
    dispatch(changeArticleDetailLoadingAction(false));
  };
};

export const getCommentListByArticleIdAction = ({
  id,
  offset = 0,
  limit = 5,
}: {
  id: number | string;
  limit?: string | number;
  offset?: string | number;
}) => {
  return async (dispatch: any) => {
    const [data, err] = await awaitHandle(
      getCommentListByArticleId({ articleId: id, offset, limit }),
    );
    if (data) {
      dispatch(changeCommentListAction(data.data.list));
      dispatch(changeCommentListTotalCountAction(data.data.totalCount));
    }
  };
};
