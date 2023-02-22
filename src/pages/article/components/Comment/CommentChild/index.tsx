/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-22 20:39:24
 */
import React, { useState, memo } from 'react';

import { showTimeNow } from '@/utils/timeFormat';
import { handleClickHiddenEvent } from '@/utils/events';
import { useLogin } from '@/hooks/useLogin';

import CommentChild from '../CommentChild';
import CommentInput from '../CommentInput';

import type { PropsWithChildren } from 'react';

export interface CommentCardPropsType {
  id: number;
  commentId: number | null;
  content: string;
  replyCommentList?: CommentCardPropsType[];
  updateAt: string;
  userInfo: any;
  isRecurse?: boolean;
  replyInfo?: any;
  neeShowReplyInfo?: boolean;
  showCommentInput?: boolean;
  onSubmitReplyHandle: (
    value: any,
    record: any,
    cb: (arg: any) => void,
    setValue: (value: string) => void,
  ) => void;
  onDeleteHandle: (id: number) => void;
}

export default memo(function index(props: PropsWithChildren<CommentCardPropsType>) {
  //props/state
  const {
    content,
    updateAt,
    userInfo,
    replyCommentList = [],
    isRecurse = true,
    replyInfo,
    neeShowReplyInfo = true,
    onSubmitReplyHandle,
    onDeleteHandle,
    id,
  } = props;
  const [showInput, setShowInput] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //redux hooks

  //other hooks
  const [isLogin, localUserInfo] = useLogin();

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
  const onBlurShowInputHandle = () => {
    setShowInput(false);
  };

  const onMouseEnterHandle = () => {
    //判断当前评论是不是当前用户的
    if (userInfo.id === (localUserInfo as any).id) {
      setShowDelete(true);
    }
  };

  return (
    <div className="px-[10px] flex p-[10px]">
      <img className="w-[36px] h-[36px] rounded-full mr-[10px]" src={userInfo?.avatar_url} />
      <div className="flex-1 overflow-hidden">
        <div onMouseEnter={onMouseEnterHandle} onMouseLeave={() => setShowDelete(false)}>
          <div className="flex justify-between">
            <div className="max-w-[70%]">
              <span className="max-w-[150px] truncate inline-block align-bottom text-[#252933]">
                {userInfo?.name}
              </span>
              {neeShowReplyInfo && (
                <span className="max-w-[180px] truncate inline-block align-bottom text-[#252933]">
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
          onBlur={onBlurShowInputHandle}
          placeholder={'回复' + userInfo.name + '...'}
          showAvatar={false}
          onSubmit={(value, setValue) => onSubmitReplyHandle(value, props, setShowInput, setValue)}
        />
      </div>
    </div>
  );
});
