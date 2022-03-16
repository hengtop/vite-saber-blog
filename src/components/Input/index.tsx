/*
 * @Date: 2022-01-24 22:59:39
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-17 00:51:17
 */
import React, { memo, useState, useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface InputPropsType {
  handleSearchChange: (value: string) => void;
  handleSearchClick: (e: any) => void;
}

export default memo(function index(props: PropsWithChildren<InputPropsType>) {
  //props/state
  const { handleSearchChange, handleSearchClick } = props;
  const [showInput, setShowInput] = useState(false);
  let isLock = false;
  //redux hooks

  //other hooks
  const inputRef = useRef(null);
  //自动聚焦
  useEffect(() => {
    if (inputRef.current && showInput) {
      (inputRef.current as any).focus();
    }
  }, [showInput]);

  //其他逻辑
  //点击搜索图标显示搜索框
  const handleSearchIconClick = () => {
    setShowInput(true);
  };
  //搜索框失去焦点
  const handleSearchBlur = () => {
    setShowInput(false);
  };
  const handleChange = (e: any) => {
    if (!isLock) {
      handleSearchChange(e.target.value);
    } else {
      return;
    }
  };
  const handleCompositionEnd = (e: any) => {
    isLock = false;
    handleSearchChange(e.target.value);
  };

  return (
    <div className="order-1 md:order-2 md:ml-[300px] lg:ml-[550px] xl:ml-[750px]">
      <div
        className={classNames('md:block h-full', {
          block: showInput,
          hidden: !showInput,
          absolute: showInput,
          'inset-0': showInput,
          'z-10': showInput,
          'px-[40px]': showInput,
          'py-[16px]': showInput,
        })}
      >
        <i
          onClick={handleSearchClick}
          className={classNames(
            'iconfont icon-sousuo text-2xl text-white align-middle mr-2 text-black cursor-pointer',
            {
              hidden: showInput,
            },
          )}
        ></i>
        <input
          ref={inputRef}
          placeholder="搜索文章"
          type="text"
          className="outline-none focus:border-b-[1px] focus:border-black caret-gray-900 bg-white max-w-[200px]"
          onChange={handleChange}
          onCompositionStart={() => {
            isLock = true;
          }}
          onCompositionEnd={handleCompositionEnd}
          onBlur={handleSearchBlur}
          onKeyDown={handleSearchClick}
        />
        <div
          className={classNames('h-[100%] w-screen bg-white absolute inset-0 z-[-1]', {
            hidden: !showInput,
          })}
        ></div>
      </div>

      <i
        className={classNames('iconfont icon-sousuo md:hidden text-2xl', { hidden: showInput })}
        onClick={handleSearchIconClick}
      ></i>
    </div>
  );
});
