/*
 * @Date: 2022-03-09 23:21:00
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-11 01:25:58
 */
import React, { memo, useEffect, PropsWithChildren, BaseSyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';

interface PropsType {
  htmlStr: string;
}

export default memo(function index(props: PropsWithChildren<PropsType>) {
  //props/state
  const { htmlStr } = props;

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

  return htmlStr ? (
    <div className="mt-[20px] bg-white p-[15px] rounded-b xl:rounded navigate-wrapper">
      <div className="text-[18px] font-bold mb-[10px]">目录</div>
      <hr className="mb-[10px]"></hr>
      <div
        dangerouslySetInnerHTML={createHtml(htmlStr)}
        className="navigate-dom"
        onClick={navigateClickHandle}
      ></div>
    </div>
  ) : (
    <></>
  );
});
