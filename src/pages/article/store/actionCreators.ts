/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 15:19:14
 */

import * as actionTypes from './constant';
import { getArticleById } from '@/network/api/article';
import { awaitHandle } from '@/utils/awaitHandle';
import type { ActionType } from '@/store/types';

export const changeArticleInfoAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLEINFO,
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
    }
    dispatch(changeArticleDetailLoadingAction(false));
  };
};
