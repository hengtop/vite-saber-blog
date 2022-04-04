import React, { memo } from 'react';

import CommentCard from '@/pages/article/components/Comment/CommentCard';

import type { PropsWithChildren } from 'react';
import type { CommentPropsType } from '../index';

export default memo(function index(props: PropsWithChildren<CommentPropsType>) {
  //props/state
  const { commentList } = props;
  console.log(commentList);
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      {commentList.map((item) => {
        return <CommentCard key={item.id} {...item} />;
      })}
    </div>
  );
});
