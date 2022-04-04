/*
 * @Date: 2022-04-04 18:12:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 23:16:21
 */
import React, { memo } from 'react';

import { mapTree } from '@/utils/map2Tree';

import TitleCard from '@/components/TitleCard';
import CommentInput from '../Comment/CommentInput';
import CommentItem from '../Comment/CommentItem';

import type { PropsWithChildren } from 'react';
import type { CommentCardPropsType } from '../Comment/CommentCard';

export interface CommentPropsType {
  commentList: CommentCardPropsType[];
}

export default memo(function index(props: PropsWithChildren<CommentPropsType>) {
  //props/state
  const { commentList } = props;
  console.log(commentList);
  //redux hooks
  //other hooks

  //其他逻辑

  return (
    <TitleCard title="评论">
      <CommentInput />
      <h2 className="pb-[10px] text-[18px] font-bold mt-[10px]">
        全部评论&nbsp;{commentList.length}
      </h2>
      {!!commentList.length && (
        <CommentItem commentList={mapTree(commentList, null, 'commentId', 'replyCommentList')} />
      )}
    </TitleCard>
  );
});
