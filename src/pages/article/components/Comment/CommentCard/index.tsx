/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 23:13:55
 */
import React, { memo } from 'react';

import { showTimeNow } from '@/utils/timeFormat';

import CommentChild from '../CommentChild';

import type { PropsWithChildren } from 'react';

export interface CommentCardPropsType {
  id: number;
  commentId: number | null;
  content: string;
  replyCommentList: CommentCardPropsType[];
  updateAt: string;
  userInfo: any;
}

export default memo(function index(props: PropsWithChildren<CommentCardPropsType>) {
  //props/state
  const { content, updateAt, userInfo, replyCommentList = [] } = props;

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div className="px-[10px] flex p-[10px]">
      <img className="w-[36px] h-[36px] rounded-full mr-[10px]" src={userInfo?.avatar_url} />
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <div className="max-w-[50%]">
            <span className="max-w-[150px] truncate inline-block align-bottom text-[#252933]">
              {userInfo?.name}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-400">{showTimeNow(updateAt)}</span>
          </div>
        </div>
        <div className="w-full max-h-[600px]  my-[10px] text-[#515767] text-[15px]">{content}</div>
        <div className="text-slate-400">
          <span className="iconfont icon-dianzan text-sm pr-[10px]">点赞</span>
          <span className="iconfont icon-pinglun1 text-sm">评论</span>
        </div>
        {!!replyCommentList.length && (
          <div className="bg-[rgba(247,248,250,.7)] border border-solid border-[#e4e6eb] mt-[10px] rounded">
            <CommentChild commentList={replyCommentList} />
          </div>
        )}
      </div>
    </div>
  );
});
