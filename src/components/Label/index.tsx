/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-10 23:24:45
 */
import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';

import LabelItem from './components/LabelItem';

interface LabelPropsType {
  label: any[];
}

export default memo(function index(props: PropsWithChildren<LabelPropsType>) {
  const { label } = props;
  return (
    <div className="bg-white px-[15px] ">
      <h2 className="pb-[10px] text-[18px] font-bold ">热门标签</h2>
      <hr className="mb-[10px]"></hr>
      {label.length
        ? (label as any[]).map((item) => {
            return <LabelItem key={item.id} labelInfo={item} queryType={'label'} />;
          })
        : '暂无标签'}
    </div>
  );
});
