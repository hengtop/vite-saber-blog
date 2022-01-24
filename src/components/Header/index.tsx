/*
 * @Date: 2022-01-23 21:09:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 23:25:06
 */
import React from 'react';

import Input from '../Input';

export default function index() {
  return (
    <div className="w-auto h-20 bg-indigo-200 flex items-center justify-center p-4">
      <div className="w-full md:container flex justify-between">
        <h2 className="order-2 md:order-1">heng的博客</h2>
        <Input />
        <div className="hidden md:block md:order-3">
          <span>菜单1</span>
          <span>菜单2</span>
          <span>菜单3</span>
          <span>登录</span>
        </div>
        <div className="md:hidden">
          <i className="iconfont icon-yonghu-xianxing"></i>
        </div>
      </div>
    </div>
  );
}
