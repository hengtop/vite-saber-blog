/*
 * @Date: 2022-04-04 18:12:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-24 23:11:20
 */

import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { awaitHandle } from '@/utils/awaitHandle';
import {
  sendComment,
  deleteComment,
  getReplyCommentListByRootCommentId,
} from '@/network/api/comment';
import { changeCommentListAction } from '../../store';
import { REPLY_COMMENT_PAGE_LIMIT } from '@/constant/comment';

import TitleCard from '@/components/TitleCard';
import CommentCard from '@/pages/article/components/Comment/CommentCard';
import CommentInput from '../Comment/CommentInput';

import type { PropsWithChildren } from 'react';
import type { AppState } from '@/store/reducer';
import type { CommentCardPropsType } from '../Comment/CommentCard';
import type { SendCommnetReqType } from '@/network/config/types';
import { uniqueArr } from '@/utils/tool';

export interface CommentPropsType {
  commentList: CommentCardPropsType[];
  commentListTotalCount: number;
}

export default memo(function index(props: PropsWithChildren<CommentPropsType>) {
  //props/state
  //redux hooks
  const { commentList, commentListTotalCount } = props;
  const { userInfo } = useSelector<AppState, { userInfo: UserInfo }>(
    (state) => ({
      userInfo: state.getIn(['main', 'userInfo']) as UserInfo,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  //other hooks
  const params = useParams();

  //其他逻辑
  // 添加评论
  const sendcommentHandle = useCallback(
    async (params: SendCommnetReqType, otherParams?: any) => {
      const [data, err] = await awaitHandle(sendComment(params));
      // 乐观加载
      if (data) {
        const newCommentItem = {
          id: data.data.id,
          userInfo,
          content: params.content,
          commentId: params.comment_id ?? null,
          rootCommentId: params.root_comment_id ?? null,
          updateAt: new Date(),
          replyInfo:
            params.reply_user_id && otherParams?.content
              ? {
                  content: otherParams?.content,
                }
              : null,
          replyUserInfo: params.reply_user_id && otherParams?.userInfo,
        };
        // 判断是否是回复
        if (params.root_comment_id) {
          const commentItem = commentList.find((item) => item.id === params.root_comment_id);
          if (commentItem) {
            commentItem.replies.list = commentItem?.replies.list ?? [];
            commentItem.replies?.list.push(newCommentItem as any);
            dispatch(changeCommentListAction([...(commentList as CommentCardPropsType[])]));
          }
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
  const deleteCommentHandle = useCallback<
    (id: number, rootCommentId?: number | null) => Promise<void>
  >(
    async (id, rootCommentId) => {
      // 这里删除评论有个bug，删除有多条回复的评论时，评论总数只会减少1，当然这只是前端的bug（我没考虑关联子评论的删除），重新刷新就没问题了
      if (confirm('确认删除该条评论吗？')) {
        const [data, err] = await awaitHandle(deleteComment(id));
        if (data) {
          if (rootCommentId) {
            const commentItem = commentList.find((item) => item.id === rootCommentId);
            if (commentItem) {
              commentItem.replies.list =
                commentItem?.replies.list?.filter((item) => item.id !== id) ?? [];
              console.log(commentItem.replies.list);
              dispatch(changeCommentListAction([...commentList]));
            }
          } else {
            dispatch(changeCommentListAction(commentList.filter((item) => item.id !== id)));
          }
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
  const submitReplyHandle = async (
    value: string,
    record: any,
    cb: (arg: any) => void,
    setValue: (value: string) => void,
  ) => {
    if (params.articleId && value.length !== 0) {
      console.log(record.id, record.rootCommentId);
      await sendcommentHandle(
        {
          article_id: parseInt(params.articleId),
          content: value,
          comment_id: record.id,
          // 回复对象是顶级评论就不添加reply
          reply_user_id: record.commentId ? record.userInfo.id : null,
          root_comment_id: record.rootCommentId ?? record.id,
        },
        record,
      );
      cb && cb(false);
      setValue && setValue('');
    }
  };

  // 展示更多评论
  const showMoreCommentHandle = useCallback<
    (
      id: number,
      setShowReplyMore: (params: boolean) => void,
      setShowReplyMoreLoading: (params: boolean) => void,
    ) => Promise<void>
  >(
    async (id, setShowReplyMore, setShowReplyMoreLoading) => {
      // 展示更多评论
      setShowReplyMoreLoading(true);
      // 加载当前评论下的第一页数据
      const [data, err] = await awaitHandle<any>(
        getReplyCommentListByRootCommentId({
          rootCommentId: id,
          offset: 0,
          limit: REPLY_COMMENT_PAGE_LIMIT,
        }),
      );
      if (!err) {
        setShowReplyMoreLoading(false);
        setShowReplyMore(true);
        const rootComment = commentList.find((item) => item.id === id);
        if (rootComment) {
          const newList = rootComment.replies.list?.concat(data?.data.list) ?? [];
          rootComment.replies.list = uniqueArr(newList);
          console.log(rootComment.replies.list);
          dispatch(changeCommentListAction([...commentList]));
        }
      }
    },
    [
      awaitHandle,
      dispatch,
      changeCommentListAction,
      commentList,
      getReplyCommentListByRootCommentId,
    ],
  );
  // 分页加载回复
  const loadPaginationCommentHandle = useCallback<(arg: number, id: number) => Promise<void>>(
    async (arg, id) => {
      const [data, err] = await awaitHandle(
        getReplyCommentListByRootCommentId({
          rootCommentId: id,
          offset: (arg - 1) * REPLY_COMMENT_PAGE_LIMIT,
          limit: REPLY_COMMENT_PAGE_LIMIT,
        }),
      );
      if (!err) {
        const rootComment = commentList.find((item) => item.id === id);
        if (rootComment) {
          const newList = data?.data.list ?? [];
          rootComment.replies.list = newList;
          dispatch(changeCommentListAction([...commentList]));
        }
      }
    },
    [
      awaitHandle,
      dispatch,
      changeCommentListAction,
      commentList,
      getReplyCommentListByRootCommentId,
    ],
  );

  //将数据处理为数型数组
  return (
    <TitleCard title="评论">
      <CommentInput onSubmit={onSubmitCommentHandle} />
      <h2 className="pb-[10px] text-[18px] font-bold mt-[10px]">
        全部评论&nbsp;{commentListTotalCount}
      </h2>
      {!!commentList.length &&
        commentList.map((item) => {
          return (
            <CommentCard
              /* 设置一二级评论不显示回复信息 */
              key={item.id}
              {...item}
              onSubmitReplyHandle={submitReplyHandle}
              onDeleteHandle={deleteCommentHandle}
              onShowMoreComment={showMoreCommentHandle}
              onLoadPaginationComment={loadPaginationCommentHandle}
            />
          );
        })}
    </TitleCard>
  );
});
