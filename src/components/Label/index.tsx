/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-06 19:08:44
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
      {(label as any[]).map((item) => {
        return (
          <span
            key={item.id}
            className="inline-block px-[5px] whitespace-nowrap bg-[#fafafa] border border-[#d9d9d9] mx-[5px] my-[3px] rounded cursor-pointer"
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
});
