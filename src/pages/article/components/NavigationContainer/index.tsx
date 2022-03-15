/*
 * @Date: 2022-03-09 23:21:00
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-15 23:08:46
 */
import React, {
  memo,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  BaseSyntheticEvent
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import type { RenderObjType } from '@/utils/md2Navigate';
import { scrollTo } from '@/utils/scrollTo';

import './index.css';

interface PropsType {
  domRenderObjArr: RenderObjType[];
}

export default memo(function index(props: PropsWithChildren<PropsType>) {
  //props/state

  const titleOffsetTop: number[] = [];
  const navigateOffsetTop: number[] = [];
  const { domRenderObjArr } = props;
  const [showNavigate, setShowNavigate] = useState(false);
  //获取导航容器的dom
  const navigateContainerDom = useRef<HTMLDivElement | null>(null);
  //设置当前的激活导航索引
  const [currentIndex, setCurrentIndex] = useState(0);

  //redux hooks

  //other hooks
  const location = useLocation();
  const navigate = useNavigate();
  //根据激活的index进行个更新
  useEffect(() => {
    getOffsetTopByHash();
    getOffsetTopByHref();
    setScrollTopForNavigate(currentIndex);
    window.addEventListener('scroll', domScrollhandle);
    return () => window.removeEventListener('scroll', domScrollhandle);
  }, [domRenderObjArr, currentIndex]);

  //根据url中的hash确定滚动条滚动位置和导航激活
  useEffect(() => {
    setOffsetTopByHash(location.hash);
    domScrollhandle();
  }, [domRenderObjArr]);

  //其他逻辑
  //根据id获取每个标题的offsetTop
  const getOffsetTopByHash = () => {
    domRenderObjArr.map((item) => {
      const hash = '#' + item.id;
      const offsetTop = getDomByHash(hash)?.offsetTop as number;
      titleOffsetTop.push(offsetTop);
    });
  };
  //根绝href来获取每个导航条的offsetTop
  const getOffsetTopByHref = () => {
    domRenderObjArr.map((item) => {
      const hash = '#' + item.id;
      const offsetTop = (document.querySelector('a[href="' + hash + '"]') as any)
        .offsetTop as number;
      navigateOffsetTop.push(offsetTop);
    });
  };
  //监听滚动条来同步导航的激活
  const domScrollhandle = () => {
    let i = 0;
    const scrollTop = document.documentElement.scrollTop;
    for (i; i < titleOffsetTop.length; i++) {
      if (titleOffsetTop[i + 1] - 120 > scrollTop) {
        break;
        //处理边界
      } else if (i + 1 === titleOffsetTop.length) {
        break;
      }
    }
    setCurrentIndex(i);
  };

  //调整锚点跳转时的位置
  const navigateClickHandle = (e: BaseSyntheticEvent) => {
    //避免默认锚点跳转导致的高度不合适
    if (e.target.nodeName === 'A') {
      e.preventDefault();
      //获取激活的index，设置激活样式
      const index = +e.target.dataset.index;
      setCurrentIndex(index);
      //设置hash
      navigate(e.target.hash);
      //设置导航栏滚动的高度
      setScrollTopForNavigate(index);
      //获取id,跳转到指定高度
      setOffsetTopByHash(e.target.hash);
    }
  };
  //设置合适的显示高度
  const setOffsetTopByHash = (hash: string) => {
    //获取dom元素offsetTop
    const offsetTop = getDomByHash(hash)?.offsetTop ?? 100;
    //scrollTo(document.documentElement, offsetTop - 100, 200);
    document.documentElement.scrollTop = offsetTop - 100;
  };
  //todo 设置导航栏合适的滚动高度,这里设置动画的化，如果用户在同一时间内滚动了很多的导航标题会有抖动的现象，这个后续想起了在优化
  const setScrollTopForNavigate = (index: number) => {
    if (navigateContainerDom.current) {
      //navigateContainerDom.current.scrollTop = navigateOffsetTop[index] - 240;
      scrollTo(navigateContainerDom.current, navigateOffsetTop[index] - 240, 200);
    }
  };

  //根据hahs提取id获取对应的dom
  const getDomByHash = (hash: string) => {
    const id = decodeURI(hash).slice(1);
    return document.getElementById(id);
  };

  //显示隐藏导航
  const handleClickShowNavigate = () => {
    setShowNavigate(!showNavigate);
  };

  return domRenderObjArr.length ? (
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
          className="lg:hidden bg-white shadow-sm rounded-l-full py-[15px] pb-[12px] px-4 absolute top-[0px] left-[-48px]"
        >
          <i className="iconfont icon-liebiao"></i>
        </div>
        <div className="text-[18px] font-bold mb-[10px]">目录</div>
        <hr className="mb-[10px]"></hr>
        <div ref={navigateContainerDom} className="navigate-dom" onClick={navigateClickHandle}>
          {domRenderObjArr.map((item, index) => {
            return (
              <a
                href={'#' + item.id}
                data-index={index}
                className={classNames('a-' + item.html, {
                  'navigate-a-active': currentIndex === index
                })}
                key={index}
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
});
