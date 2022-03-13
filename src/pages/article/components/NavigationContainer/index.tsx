/*
 * @Date: 2022-03-09 23:21:00
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-13 22:23:34
 */
import React, { memo, useState, useEffect, PropsWithChildren, BaseSyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import './index.css';

interface PropsType {
  htmlStr: string;
}

export default memo(function index(props: PropsWithChildren<PropsType>) {
  //props/state
  const { htmlStr } = props;
  const [showNavigate, setShowNavigate] = useState(false);

  //redux hooks

  //other hooks
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getHashToOffsetTop(location.hash);
  }, [location, htmlStr]);

  //其他逻辑
  //获取导航dom
  const createHtml = (htmlStr: string) => {
    return {
      __html: htmlStr
    };
  };

  //调整锚点跳转时的位置
  const navigateClickHandle = (e: BaseSyntheticEvent) => {
    //避免默认锚点跳转导致的高度不合适
    if (e.target.nodeName === 'A') {
      e.preventDefault();
      //设置hash
      navigate(e.target.hash);
      //获取id,跳转到指定高度
      getHashToOffsetTop(e.target.hash);
    }
  };

  const getHashToOffsetTop = (hash: string) => {
    const id = decodeURI(hash).slice(1);
    //获取dom元素offsetTop
    const offsetTop = document.getElementById(id)?.offsetTop ?? 120;
    document.documentElement.scrollTop = offsetTop - 120;
  };

  //显示隐藏导航
  const handleClickShowNavigate = () => {
    setShowNavigate(!showNavigate);
  };

  return htmlStr ? (
    <>
      <div
        className={classNames(
          'fixed  right-[-280px] top-[100px] w-[280px] lg:w-auto  lg:sticky lg:w-[100%] lg:right-[0px] ld:top-[80px] mt-[20px] bg-white p-[15px] rounded-b xl:rounded shadow-md navigate-wrapper',
          {
            'navigate-wrapper-active': showNavigate
          }
        )}
      >
        <div
          onClick={handleClickShowNavigate}
          className="lg:hidden bg-white shadow-sm rounded-l-full py-[15px] px-4 absolute top-[0px] left-[-48px]"
        >
          <i className="iconfont icon-liebiao"></i>
        </div>
        <div className="text-[18px] font-bold mb-[10px]">目录</div>
        <hr className="mb-[10px]"></hr>
        <div
          dangerouslySetInnerHTML={createHtml(htmlStr)}
          className="navigate-dom"
          onClick={navigateClickHandle}
        ></div>
      </div>
    </>
  ) : (
    <></>
  );
});
