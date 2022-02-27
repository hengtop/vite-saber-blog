/*
 * @Date: 2022-02-20 17:34:29
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-27 20:35:37
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
    <div className={classNames('article-detail-skeleton-wrapper', className)}>
      <div className="article-detail-skeleton">
        <div className="skeleton-detail-line"></div>
        <div className="skeleton-detail-line"></div>
        <div className="skeleton-detail-line"></div>
        <div className="skeleton-detail-line"></div>
        <div className="skeleton-detail-line"></div>
      </div>
    </div>
  );
});
