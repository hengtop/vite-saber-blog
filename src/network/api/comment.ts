/*
 * @Date: 2022-04-04 17:34:50
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 21:12:53
 */
import httpRequest from '..';
import type { CommonResponseType } from '../config/types';

// 获取文章下所有的评论
export const getCommentListByArticleId = (articleId: number) => {
  return httpRequest.get<CommonResponseType>({
    url: '/comment',
    params: {
      articleId,
    },
  });
};
