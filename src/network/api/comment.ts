/*
 * @Date: 2022-04-04 17:34:50
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-24 20:57:48
 */
import httpRequest from '..';
import type {
  CommentReplyResponseType,
  CommentResponseType,
  CommonResponseType,
  SendCommnetReqType,
} from '../config/types';

// 获取文章下所有的评论
export const getCommentListByArticleId = ({
  articleId,
  offset,
  limit,
}: {
  articleId: number | string;
  limit: string | number;
  offset: string | number;
}) => {
  return httpRequest.get<CommentResponseType>({
    url: '/comment/v2',
    params: {
      articleId,
      offset,
      limit,
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

// 加载更多回复
export const getReplyCommentListByRootCommentId = ({
  rootCommentId,
  offset,
  limit,
}: {
  rootCommentId: number | string;
  limit: string | number;
  offset: string | number;
}) => {
  return httpRequest.get<CommentReplyResponseType>({
    url: '/comment/reply',
    params: {
      rootCommentId,
      offset,
      limit,
    },
  });
};
