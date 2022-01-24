/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 17:33:02
 */

import * as actionTypes from './constant';
import { getAllArticle } from '@/network/api/article';
import type { queryArticle } from '@/network/config/types';
import type { actionType } from '@/store/types';

export const changeArticleAction = (res: any[]): actionType => ({
  type: actionTypes.CHANGE_ARTICLE,
  value: res
});

export const getAllArticleAction = (query?: queryArticle) => {
  return async (dispatch: any) => {
    const {
      data: { list }
    } = await getAllArticle(query);
    dispatch(changeArticleAction(list));
  };
};
