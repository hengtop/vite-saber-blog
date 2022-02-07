/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-07 22:10:50
 */
import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';

interface LabelPropsType {
  label: any[];
}

export default memo(function index(props: PropsWithChildren<LabelPropsType>) {
  const { label } = props;
  return (
    <div className="bg-white p-[15px] ">
      <h2 className="pb-[10px]">热门标签</h2>
      {label.length
        ? (label as any[]).map((item) => {
            return (
              <span
                key={item.id}
                className="inline-block px-[5px] whitespace-nowrap bg-[#fafafa] border border-[#d9d9d9] mx-[5px] my-[3px] rounded cursor-pointer"
              >
                {item.name}
              </span>
            );
          })
        : '暂无标签'}
    </div>
  );
});
