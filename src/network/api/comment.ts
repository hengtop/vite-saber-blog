/*
 * @Date: 2022-04-04 17:34:50
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-05 22:27:08
 */
import httpRequest from '..';
import type { CommonResponseType, SendCommnetReqType } from '../config/types';

// 获取文章下所有的评论
export const getCommentListByArticleId = (articleId: number) => {
  return httpRequest.get<CommonResponseType>({
    url: '/comment',
    params: {
      articleId,
    },
  });
};

// 发送评论
export const sendComment = (params: SendCommnetReqType) => {
  return httpRequest.post<CommonResponseType>({
    url: '/comment',
    data: params,
  });
};

//删除评论
export const deleteComment = (id: number) => {
  return httpRequest.delete<CommonResponseType>({
    url: '/comment/' + id,
  });
};
