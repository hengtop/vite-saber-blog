/*
 * @Date: 2022-04-04 20:46:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-23 21:33:49
 */
import type { AppState } from '@/store/reducer';
import type { PropsWithChildren } from 'react';
import React, { useState, memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getReplyCommentListByRootCommentId } from '@/network/api/comment';
import { showTimeNow } from '@/utils/timeFormat';
import { handleClickHiddenEvent } from '@/utils/events';
import { useLogin } from '@/hooks/useLogin';
import { awaitHandle } from '@/utils/awaitHandle';

import CommentChild from '../CommentChild';
import CommentInput from '../CommentInput';

import PageComponent from '@/components/PageComponent';

import './index.css';
import { changeCommentListAction } from '@/pages/article/store';

export interface CommentCardPropsType {
  id: number;
  commentId: number | null;
  content: string;
  commentList?: CommentCardPropsType[];
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
  replies: { list: CommentCardPropsType[]; totalCount: number };
}

export default memo(function index(props: PropsWithChildren<CommentCardPropsType>) {
  //props/state
  const { content, updateAt, userInfo, onSubmitReplyHandle, onDeleteHandle, replies, id } = props;
  const [showInput, setShowInput] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showReplyMore, setShowReplyMore] = useState(false);

  //redux hooks\
  const { commentList } = useSelector(
    (state: AppState) => ({
      articleDetailLoading: state.getIn(['article', 'articleDetailLoading']),
      commentList: state.getIn(['article', 'commentList']),
      commentListTotalCount: state.getIn(['article', 'commentListTotalCount']),
    }),
    shallowEqual,
  );

  //other hooks
  const dispatch = useDispatch();

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

  const handkePageChange = async (arg: any) => {
    console.log(arg);
    const [data, err] = await awaitHandle(
      getReplyCommentListByRootCommentId({
        rootCommentId: id,
        offset: (arg - 1) * 10,
        limit: 10,
      }),
    );
    if (!err) {
      const rootComment = commentList.find((item) => item.id === id);
      if (rootComment) {
        const newList = data?.data.list;
        rootComment.replies.list = data?.data.list;
        dispatch(changeCommentListAction([...commentList]));
      }
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
            <div className="comment-page-component">
              {showReplyMore ? (
                <PageComponent
                  currentPage={1}
                  groupCount={10}
                  totalPage={Math.ceil(replies.totalCount / 10)}
                  pageCallbackFn={handkePageChange}
                />
              ) : (
                <div
                  onClick={() => setShowReplyMore(true)}
                  className="cursor-pointer text-[13px] text-[#9499a0] p-[5px] px-[10px]"
                >
                  共{replies.totalCount}条评论 点击查看
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
