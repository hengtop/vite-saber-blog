/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-18 14:30:22
 */
import React, { memo, Fragment } from 'react';

import CommentChild from '.';
import CommentCard from '../CommentCard';

import type { PropsWithChildren } from 'react';
import type { CommentPropsType } from '../index';

interface CommentChildPropsType extends CommentPropsType {
  replyInfo?: any;
  neeShowReplyInfo?: boolean;
  onSubmitReplyHandle: (value: any, record: any, cb: (arg: any) => void) => void;
  onDeleteHandle: (id: number) => void;
}

export default memo(function index(props: PropsWithChildren<CommentChildPropsType>) {
  //props/state
  const {
    commentList = [],
    neeShowReplyInfo = true,
    onSubmitReplyHandle,
    onDeleteHandle,
    replyInfo,
  } = props;

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      {commentList.map((item) => {
        const { userInfo, replyCommentList = [] } = item;
        return (
          <Fragment key={item.id}>
            {/* 这里复用CommentCard组件，注意内部有递归，需加个判断再进行复用 */}
            {/* 二级评论 */}
            <CommentCard
              {...item}
              isRecurse={false}
              replyInfo={replyInfo}
              neeShowReplyInfo={neeShowReplyInfo}
              onDeleteHandle={onDeleteHandle}
              onSubmitReplyHandle={onSubmitReplyHandle}
            />
            {/* n级评论（n>2） */}
            <CommentChild
              replyInfo={userInfo}
              neeShowReplyInfo={true}
              commentList={replyCommentList}
              onDeleteHandle={onDeleteHandle}
              onSubmitReplyHandle={onSubmitReplyHandle}
            />
          </Fragment>
        );
      })}
    </div>
  );
});
