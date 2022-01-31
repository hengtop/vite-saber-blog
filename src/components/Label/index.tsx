/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-31 17:47:49
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
            className="inline-block px-[5px] whitespace-nowrap bg-[#bfa] mx-[5px] my-[3px] rounded cursor-pointer"
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
});
