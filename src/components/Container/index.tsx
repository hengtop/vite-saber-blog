/*
 * @Date: 2022-01-24 11:54:46
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-13 00:07:35
 */
import React from 'react';

export default function index(props: any) {
  const { leftSlot, rightSlot } = props;
  return (
    <div className="pt-4 md:p-4 flex justify-center mx-auto flex-wrap md:container  xl:flex-nowrap lg:justify-between mt-[64px]">
      <div className="xl:pr-6  lg:flex-auto w-full md:container lg:w-[1000px] overflow-hidden">
        {leftSlot}
      </div>
      <div className="w-full xl:w-[310px]">{rightSlot}</div>
    </div>
  );
}
