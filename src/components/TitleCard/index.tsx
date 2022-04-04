/*
 * @Date: 2022-04-04 18:22:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 18:39:50
 */
import React, { memo, Props } from 'react';

import type { PropsWithChildren } from 'react';

interface TitleCardPropsType {
  title?: string;
  children?: React.ReactNode | string;
}

export default memo(function index(props: PropsWithChildren<TitleCardPropsType>) {
  //props/state
  const { title = '', children = <span>item...</span> } = props;
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div className="bg-white p-[15px] mb-[10px] rounded">
      <h2 className="pb-[10px] text-[18px] font-bold ">{title}</h2>
      <hr className="mb-[10px]"></hr>
      {children}
    </div>
  );
});
