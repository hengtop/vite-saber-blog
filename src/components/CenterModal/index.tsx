/*
 * @Date: 2022-01-28 12:42:52
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-06 21:44:02
 */
import React, { memo, useState, useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginAction } from '@/store';

import Modal from '../Modal';
import type { ModalPropsType } from '../Modal';

type CenterPropsType = ModalPropsType;

export default memo(function index(props: PropsWithChildren<CenterPropsType>) {
  //props/state
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  //redux hooks
  const dispatch = useDispatch();

  //other hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!props.hidden) {
      inputRef.current?.focus();
    }
  }, [inputRef, props.hidden]);

  //其他逻辑
  const handleChangeFromData = (formItem: string) => {
    return (e: any) => {
      setFormData({ ...formData, [formItem]: e.target.value });
    };
  };

  //登录
  const handleSumbit = async (form: typeof formData) => {
    //issue 校验待做

    await dispatch(loginAction(form));
    const hiddenFunc = props.handleClickHidden;
    hiddenFunc && hiddenFunc();
  };

  return (
    <Modal {...props}>
      <div className="fixed top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full sm:w-[320px] p-[20px] bg-white sm:rounded-md z-20">
        <div
          className="absolute text-right top-[12px] right-[18px]"
          onClick={props.handleClickHidden}
        >
          <i className="iconfont icon-guanbi text-sm cursor-pointer"></i>
        </div>
        <h2 className="text-center leading-10 text-xl font-bold">登录</h2>
        <div className="flex justify-center">
          <form className="mt-[20px]">
            <div className="flex items-center my-[5px]">
              <label htmlFor="name" className="inline-block text-right w-[65px] px-1">
                用户名:
              </label>
              <input
                ref={inputRef}
                type="text"
                id="name"
                autoComplete="off"
                value={formData.name}
                onChange={handleChangeFromData('name')}
                className="outline-none rounded-sm bg-[#f2f3f4] h-[32px] px-[10px]  w-[72%]"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="password" className="inline-block text-right w-[65px] px-1">
                密码:
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChangeFromData('password')}
                className="outline-none rounded-sm bg-[#f2f3f4] h-[32px] px-[10px] w-[72%]"
              ></input>
            </div>
          </form>
        </div>
        <button
          onClick={() => handleSumbit(formData)}
          className="block w-[100px] py-[3px] px-[5px] mx-auto mt-[20px] tracking-widest rounded border border-[1px] border-solid border-[#333] hover:bg-[#f2f3f4]"
        >
          登录
        </button>
        <div className="text-sm pt-[10px] text-center">
          <span>没有账号?快&nbsp;</span>
          <a
            className="text-sm cursor-pointer text-[#000]"
            onClick={() =>
              navigate(
                '/signup' +
                  (location.search ? location.search + '&redirect=' : '?redirect=') +
                  location.pathname,
              )
            }
          >
            注册
          </a>
          <span>&nbsp;一个吧</span>
        </div>
      </div>
    </Modal>
  );
});
