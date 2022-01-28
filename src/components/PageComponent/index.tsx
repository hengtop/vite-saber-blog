/*
 * @Date: 2022-01-25 22:54:51
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-26 23:33:32
 */
import React, { memo, useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.css';

interface PageType {
  currentPage: number;
  totalPage: number;
  pageCallbackFn: (arg?: any) => void;
}

export default memo(function index(props: PageType) {
  //props/state
  const [currentPage, setCurrentPage] = useState(1); //当前页码
  const [groupCount] = useState(5); //设置页码分组
  const [startPage, setStartPage] = useState(1); //分组开始页
  const [totalPage, setTotalPage] = useState(1);
  //redux hooks

  //other hooks
  // 获取从父组件传来的总页数与当前页数
  useEffect(() => {
    setCurrentPage(props.currentPage);
    setTotalPage(props.totalPage);
  }, [props.currentPage, props.totalPage]);
  // 点击页码
  const pageClick = (currentPage: number) => {
    const getCurrentPage = props.pageCallbackFn;
    //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
    const startPage = currentPage >= groupCount ? currentPage - 2 : 1;
    setStartPage(startPage);
    setCurrentPage(currentPage);
    //将当前页码返回父组件
    getCurrentPage(currentPage);
  };
  //上一页事件
  const prePageHandeler = () => {
    pageClick(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };
  //下一页事件
  const nextPageHandeler = () => {
    pageClick(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  //其他逻辑

  const pages = [];
  // 如果当前面不是第一页 则添加上一页
  if (currentPage !== 1) {
    pages.push(
      <li className="page-item transform rotate-180" onClick={prePageHandeler} key={0}>
        {' '}
        <i className="iconfont icon-jiantouyou"></i>
      </li>
    );
  }

  /*总页码小于等于10时，全部显示出来*/
  if (totalPage <= 10) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => pageClick(i)}
          className={classNames('page-item', {
            activePage: currentPage === i
          })}
        >
          {i}
        </li>
      );
    }
  } else {
    /*总页码大于10时，部分显示*/

    //第一页
    pages.push(
      <li
        className={classNames('page-item', {
          activePage: currentPage === 1
        })}
        key={1}
        onClick={() => pageClick(1)}
      >
        1
      </li>
    );

    //前面省略号(当当前页码比分组的页码大时显示省略号)
    if (currentPage >= groupCount) {
      pages.push(
        <li className="page-item" key={-1}>
          ···
        </li>
      );
    }
    //非第一页和最后一页显示
    for (let i = currentPage - 2; i < currentPage + 3; i++) {
      if (i <= totalPage - 1 && i > 1) {
        pages.push(
          <li
            className={classNames('page-item', {
              activePage: currentPage === i
            })}
            key={i}
            onClick={() => pageClick(i)}
          >
            {i}
          </li>
        );
      }
    }
    //后面省略号
    if (totalPage - startPage >= groupCount + 1) {
      pages.push(
        <li className="page-item" key={-2}>
          ···
        </li>
      );
    }
    //最后一页
    pages.push(
      <li
        className={classNames('page-item', {
          activePage: currentPage === totalPage
        })}
        key={totalPage}
        onClick={() => pageClick(totalPage)}
      >
        {totalPage}
      </li>
    );
  }

  //如果当前面不是最后一页 则添加下一页
  if (currentPage !== totalPage) {
    pages.push(
      <li className="page-item" onClick={nextPageHandeler} key={totalPage + 1}>
        <i className="iconfont icon-jiantouyou"></i>
      </li>
    );
  }
  return <ul className="page-container w-full flex justify-center flex-wrap">{pages}</ul>;
});
