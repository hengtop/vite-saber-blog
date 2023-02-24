/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-25 02:04:21
 */
import type { PropsWithChildren } from 'react';
import React, { useState, memo } from 'react';

import { showTimeNow } from '@/utils/timeFormat';
import { handleClickHiddenEvent } from '@/utils/events';
import { REPLY_COMMENT_PAGE_LIMIT } from '@/constant/comment';

import CommentChild from '../CommentChild';
import CommentInput from '../CommentInput';
import PageComponent from '@/components/PageComponent';

import './index.css';
import { CommentType, RepliesType } from '@/network/types';
import { useCommentItemEvent } from '../hooks';

export interface CommentCardPropsType {
  id: number;
  commentId: number | null;
  rootCommentId: number | null;
  content: string;
  commentList?: CommentType[];
  updateAt: string;
  userInfo: any;
  replyInfo?: any;
  showCommentInput?: boolean;
  replies: { list: RepliesType[] | null; totalCount: number | null };
  onSubmitReplyHandle: (
    value: any,
    record: any,
    cb: (arg: any) => void,
    setValue: (value: string) => void,
  ) => void;
  onDeleteHandle: (id: number, rootCommentId?: number | null) => Promise<void>;
  onShowMoreComment: (
    id: number,
    setShowReplyMore: (params: boolean) => void,
    setShowReplyMoreLoading: (params: boolean) => void,
  ) => Promise<void>;
  onLoadPaginationComment: (arg: number, id: number) => Promise<void>;
}

export default memo(function index(props: PropsWithChildren<CommentCardPropsType>) {
  //props/state
  const {
    content,
    updateAt,
    userInfo,
    onSubmitReplyHandle,
    onDeleteHandle,
    onShowMoreComment,
    onLoadPaginationComment,
    replies,
    id,
  } = props;
  const [showInput, setShowInput] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReplyMore, setShowReplyMore] = useState(false);
  const [showReplyMoreLoading, setShowReplyMoreLoading] = useState(false);

  //redux hooks

  //other hooks
  const [isLogin, isShowDelete] = useCommentItemEvent(userInfo.id);
  //other hooks

  //其他逻辑
  //通过点击的方式显示隐藏输入框
  const onClickShowInputHandle = async () => {
    // 判断用户是否登录
    if (!showInput && !isLogin) {
      handleClickHiddenEvent.emit('openLoginWindow');
      return;
    }
    //避免触发失焦点事件
    setShowInput(!showInput);
  };

  return (
    <div className="px-[10px] flex p-[10px]">
      <img className="w-[36px] h-[36px] rounded-full mr-[10px]" src={userInfo?.avatar_url} />
      <div className="flex-1 overflow-hidden">
        <div
          onMouseEnter={() => setShowDelete(isShowDelete)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <div className="flex justify-between">
            <div className="max-w-[70%]">
              <span className="max-w-[150px] truncate inline-block align-bottom text-[#252933]">
                {userInfo?.name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm text-slate-400">{showTimeNow(updateAt)}</span>
            </div>
          </div>
          <div className="w-full max-h-[600px]  my-[10px] text-[#515767] text-[15px]">
            {content}
          </div>
          <div className="text-slate-400 flex items-center">
            <span className="iconfont icon-dianzan text-sm pr-[10px] cursor-pointer">点赞</span>
            <span
              className="iconfont icon-pinglun1 text-sm cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onClickShowInputHandle}
            >
              评论
            </span>
            <span className="flex-1 text-right leading-none">
              {showDelete && (
                <span
                  className="text-sm cursor-pointer text-red-600"
                  onClick={() => onDeleteHandle(props.id)}
                >
                  删除
                </span>
              )}
            </span>
          </div>
        </div>
        <CommentInput
          showInput={showInput}
          onBlur={() => setShowInput(false)}
          placeholder={'回复' + userInfo.name + '...'}
          showAvatar={false}
          onSubmit={(value, setValue) => onSubmitReplyHandle(value, props, setShowInput, setValue)}
        />
        {!!replies?.list?.length && (
          <div className="bg-[rgba(247,248,250,.7)] border border-solid border-[#e4e6eb] mt-[10px] rounded">
            {replies.list.map((item) => (
              <CommentChild
                key={item.id}
                {...item}
                onDeleteHandle={onDeleteHandle}
                onSubmitReplyHandle={onSubmitReplyHandle}
              />
            ))}

            {!!replies.totalCount && replies.totalCount > 2 && (
              <div className="comment-page-component">
                {showReplyMoreLoading ? (
                  <div className="text-[13px] p-[5px] px-[10px]">加载中...</div>
                ) : showReplyMore ? (
                  <PageComponent
                    showTotalCount
                    totalCountText={'条回复'}
                    currentPage={1}
                    groupCount={REPLY_COMMENT_PAGE_LIMIT}
                    totalCount={replies.totalCount}
                    totalPage={Math.ceil(replies.totalCount / REPLY_COMMENT_PAGE_LIMIT)}
                    pageCallbackFn={(arg: number) => onLoadPaginationComment(arg, id)}
                  />
                ) : (
                  <div
                    onClick={() => onShowMoreComment(id, setShowReplyMore, setShowReplyMoreLoading)}
                    className="cursor-pointer text-[13px] text-[#9499a0] p-[5px] px-[10px]"
                  >
                    共{replies.totalCount}条评论 点击查看更多
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
