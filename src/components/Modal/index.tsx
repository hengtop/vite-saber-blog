/*
 * @Date: 2022-01-28 13:06:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-29 01:01:14
 */
/*
 * @Date: 2022-01-27 22:40:21
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 00:45:53
 */
import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface ModalPropsType {
  children?: React.ReactNode;
  className?: any;
  hidden?: boolean;
  maskClassName?: string;
  MaskHidden?: boolean;
}

export default memo(function index(props: PropsWithChildren<ModalPropsType>) {
  //props/state
  //redux hooks

  //other hooks

  //其他逻辑
  //设置默认值
  const { hidden = true, MaskHidden = false } = props;
  return (
    <>
      {/* 记录一个issue tailwind长沙市样式优先级问题，有时候同一个标签后边的类名不能覆盖，有时候又会，这跟缓存也有一定的关系，坑了我好久 */}
      <div
        className={classNames(
          'fixed inset-0 z-10',
          { hidden: hidden || MaskHidden },
          props.maskClassName
        )}
      ></div>
      <div
        className={classNames('fixed bg-white rounded z-20', props.className, { hidden: hidden })}
      >
        {props.children}
      </div>
    </>
  );
});
