/*
 * @Date: 2022-02-20 17:34:29
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-27 19:53:07
 */
//骨架加载组件

import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

import './index.css';

interface Sleleton {
  className?: string;
}

export default memo(function index(props: PropsWithChildren<Sleleton>) {
  //props/state
  const { className } = props;
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div className={classNames('article-list-skeleton', className)}>
      <div className="skeleton-list-line"></div>
      <div className="skeleton-list-line"></div>
      <div className="skeleton-list-line"></div>
      <div className="skeleton-list-line"></div>
    </div>
  );
});
