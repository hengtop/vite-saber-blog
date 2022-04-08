/*
 * @Date: 2022-04-04 19:04:06
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-09 00:26:41
 */
import React, { memo, useState, useRef, useEffect } from 'react';

import { useLogin } from '@/hooks/useLogin';
import { handleClickHiddenEvent } from '@/utils/events';

import type { BaseSyntheticEvent, PropsWithChildren } from 'react';

interface CommentInputPropsType {
  showInput?: boolean;
  showAvatar?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onSubmit: (value: string, cb?: (arg: any) => void) => void;
}

export default memo(function index(props: PropsWithChildren<CommentInputPropsType>) {
  //props/state
  const {
    onChange,
    onSubmit,
    showAvatar = true,
    placeholder = '输入评论',
    onBlur,
    showInput = true,
  } = props;
  const [content, setContent] = useState<string>('');
  const [showButton, setShowButton] = useState(false);
  const texareaRef = useRef<HTMLTextAreaElement>(null);

  //redux hooks
  const [isLogin, userInfo] = useLogin();
  //other hooks

  //其他逻辑
  const onInputHandle = (e: BaseSyntheticEvent) => {
    onChange && onChange(e.target.value);
    setContent(e.target.value);
  };

  const onMousedownHandle = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    //检验用户是否登录
    if (!isLogin) {
      //打开登录窗口
      handleClickHiddenEvent.emit('openLoginWindow');
    } else {
      texareaRef.current?.focus();
      setShowButton(true);
    }
  };

  const onBlurHandle = () => {
    setShowButton(false);
    onBlur && onBlur();
  };
  const onFocusHandle = () => {
    setShowButton(true);
  };

  return (
    <>
      {showInput && (
        <div className="p-[5px]" onBlur={onBlurHandle}>
          <div className="flex">
            {showAvatar && (
              <img
                className="w-[36px] h-[36px] rounded-full mt-[10px] mr-[20px]"
                src={(userInfo as any).avatar_url}
              />
            )}
            <textarea
              autoFocus
              ref={texareaRef}
              onMouseDown={onMousedownHandle}
              onFocus={onFocusHandle}
              placeholder={placeholder}
              className="form-textarea flex-1 resize-none !rounded !border-transparent outline-transparent !bg-[#f2f3f5]"
              value={content}
              onInput={onInputHandle}
            ></textarea>
          </div>
          <div className="w-full text-right mt-[10px] h-[32px]">
            {showButton && (
              <span
                className="px-[12px] py-[5px] bg-[#1e80ff] rounded text-white cursor-pointer"
                onClick={() => onSubmit(content, setContent)}
                onMouseDown={(e) => e.preventDefault()}
              >
                发表
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
});
