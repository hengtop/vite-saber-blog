/*
 * @Date: 2022-01-24 11:54:46
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-29 00:15:32
 */
import React from 'react';

export default function index(props: any) {
  const { leftSlot, rightSlot } = props;
  return (
    <div className="p-4 flex justify-center mx-auto flex-wrap lg:container xl:container  lg:flex-nowrap lg:justify-between mt-[64px]">
      <div className="lg:pr-6  lg:flex-auto w-full md:container">{leftSlot}</div>
      <div className=" w-[310px] lg:w-[310px] lg:min-w-[310px]">{rightSlot}</div>
    </div>
  );
}
