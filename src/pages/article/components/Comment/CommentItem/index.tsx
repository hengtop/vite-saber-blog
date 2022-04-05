import React, { useState, memo } from 'react';

import CommentCard from '@/pages/article/components/Comment/CommentCard';

import type { PropsWithChildren } from 'react';
import type { CommentPropsType } from '../index';

interface CommentItemPropsType extends CommentPropsType {
  onDeleteHandle: (id: number) => void;
  onSubmitReplyHandle: (value: any, record: any, cb: (arg: any) => void) => void;
}

export default memo(function index(props: PropsWithChildren<CommentItemPropsType>) {
  //props/state
  const { commentList, onSubmitReplyHandle, onDeleteHandle } = props;
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <>
      {commentList.map((item) => {
        return (
          <CommentCard
            /* 设置一二级评论不显示回复信息 */
            neeShowReplyInfo={false}
            key={item.id}
            {...item}
            onSubmitReplyHandle={onSubmitReplyHandle}
            onDeleteHandle={onDeleteHandle}
          />
        );
      })}
    </>
  );
});
