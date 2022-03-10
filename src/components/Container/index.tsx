/*
 * @Date: 2022-01-24 11:54:46
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-11 00:04:29
 */
import React from 'react';

export default function index(props: any) {
  const { leftSlot, rightSlot } = props;
  return (
    <div className="pt-4 md:p-4 flex justify-center mx-auto flex-wrap md:container  lg:flex-nowrap lg:justify-between mt-[64px]">
      <div className="lg:pr-6  lg:flex-auto w-full md:container overflow-hidden">{leftSlot}</div>
      <div className="w-full lg:w-[350px] flex-none">{rightSlot}</div>
    </div>
  );
}
