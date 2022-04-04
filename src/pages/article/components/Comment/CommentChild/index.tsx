/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 23:14:30
 */
import React, { memo } from 'react';

import { showTimeNow } from '@/utils/timeFormat';

import CommentChild from '.';

import type { PropsWithChildren } from 'react';
import type { CommentPropsType } from '../index';

interface CommentChildPropsType extends CommentPropsType {
  replyInfo?: any;
}

export default memo(function index(props: PropsWithChildren<CommentChildPropsType>) {
  //props/state
  const { commentList = [], replyInfo } = props;

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      {commentList.map((item) => {
        const { content, updateAt, userInfo, replyCommentList = [] } = item;
        return (
          <>
            <div className="px-[10px] flex p-[10px]">
              <img
                className="w-[30px] h-[30px] rounded-full mr-[10px]"
                src={userInfo?.avatar_url}
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <div className="max-w-[60%]">
                    <span className="max-w-[150px] truncate inline-block align-bottom text-[#252933]">
                      {userInfo?.name}
                    </span>
                    {replyInfo && (
                      <span>
                        <span className="text-[#515767]">&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                        {replyInfo?.name}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-slate-400">{showTimeNow(updateAt)}</span>
                  </div>
                </div>
                <div className="w-full max-h-[600px]  my-[10px] text-[#515767] text-[15px]">
                  {content}
                </div>
                <div className="text-slate-400">
                  <span className="iconfont icon-dianzan text-sm pr-[10px]">点赞</span>
                  <span className="iconfont icon-pinglun1 text-sm">评论</span>
                </div>
              </div>
            </div>
            <CommentChild replyInfo={userInfo} commentList={replyCommentList} />
          </>
        );
      })}
    </div>
  );
});
