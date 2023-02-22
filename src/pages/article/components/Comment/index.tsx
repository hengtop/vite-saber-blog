/*
 * @Date: 2022-04-04 18:12:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-22 20:40:05
 */
import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { mapTree } from '@/utils/map2Tree';
import { awaitHandle } from '@/utils/awaitHandle';
import { sendComment, deleteComment } from '@/network/api/comment';
import { changeCommentListAction } from '../../store';

import TitleCard from '@/components/TitleCard';
import CommentInput from '../Comment/CommentInput';
import CommentList from './CommentList';

import type { PropsWithChildren } from 'react';
import type { AppState } from '@/store/reducer';
import type { CommentCardPropsType } from '../Comment/CommentCard';
import type { SendCommnetReqType } from '@/network/config/types';

export interface CommentPropsType {
  commentList: CommentCardPropsType[];
  commentListTotalCount: number;
}

export default memo(function index(props: PropsWithChildren<CommentPropsType>) {
  //props/state
  //redux hooks
  const { commentList, commentListTotalCount } = props;
  const { userInfo } = useSelector(
    (state: AppState) => ({
      userInfo: state.getIn(['main', 'userInfo']),
    }),
    shallowEqual,
  );

  //other hooks
  const params = useParams();
  const dispatch = useDispatch();

  //其他逻辑
  // 添加评论
  const sendcommentHandle = useCallback(
    async (params: SendCommnetReqType) => {
      const [data, err] = await awaitHandle(sendComment(params));
      if (data) {
        const newCommentItem = {
          id: data.data.id,
          userInfo,
          content: params.content,
          commentId: params.comment_id ?? null,
          rootCommentId: params.root_comment_id ?? null,
          updateAt: new Date(),
        };
        // 判断是否是回复
        if (params.root_comment_id) {
          const commentItem = commentList.find((item) => item.id === params.root_comment_id);
          commentItem.replies.list = commentItem?.replies.list ?? [];
          commentItem.replies?.list.push(newCommentItem);
          commentItem.replies.totalCount = (commentItem.replies.totalCount ?? 0) + 1;
          dispatch(changeCommentListAction([...(commentList as CommentCardPropsType[])]));
        } else {
          dispatch(
            changeCommentListAction([...(commentList as CommentCardPropsType[]), newCommentItem]),
          );
        }
      }
    },
    [commentList, userInfo],
  );

  // 发送删除评论的请求
  const deleteCommentHandle = useCallback(
    async (id: number) => {
      // 这里删除评论有个bug，删除有多条回复的评论时，评论总数只会减少1，当然这只是前端的bug（我没考虑关联子评论的删除），重新刷新就没问题了
      if (confirm('确认删除该条评论吗？')) {
        const [data, err] = await awaitHandle(deleteComment(id));
        if (data) {
          dispatch(changeCommentListAction(commentList.filter((item) => item.id !== id)));
        }
      }
    },
    [commentList],
  );

  // 发送评论
  const onSubmitCommentHandle = async (value: string, cb?: (arg: any) => void) => {
    if (params.articleId && value.length !== 0) {
      await sendcommentHandle({
        article_id: parseInt(params.articleId),
        content: value,
      });
      //清空输入框
      console.log(cb);
      cb && cb('');
    }
  };
  // 回复评论
  const onSubmitReplyHandle = async (
    value: string,
    record: any,
    cb: (arg: any) => void,
    setValue: (value: string) => void,
  ) => {
    if (params.articleId && value.length !== 0) {
      await sendcommentHandle({
        article_id: parseInt(params.articleId),
        content: value,
        comment_id: record.id,
        // 回复对象是顶级评论就不添加reply
        reply_user_id: record.commentId ? record.userInfo.id : null,
        root_comment_id: record.rootCommentId ?? record.id,
      });
      cb && cb(false);
      setValue && setValue('');
    }
  };

  // 删除评论
  const onDeleteHandle = (id: number) => {
    deleteCommentHandle(id);
  };

  //将数据处理为数型数组
  return (
    <TitleCard title="评论">
      <CommentInput onSubmit={onSubmitCommentHandle} />
      <h2 className="pb-[10px] text-[18px] font-bold mt-[10px]">
        全部评论&nbsp;{commentListTotalCount}
      </h2>
      {!!commentList.length && (
        <CommentList
          onDeleteHandle={onDeleteHandle}
          commentList={commentList}
          onSubmitReplyHandle={onSubmitReplyHandle}
        />
      )}
    </TitleCard>
  );
});
