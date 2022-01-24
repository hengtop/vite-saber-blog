/*
 * @Date: 2022-01-24 22:59:39
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 23:50:45
 */
import React, { memo } from 'react';

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div className="order-3 md:order-2 md:ml-[300px] lg:ml-[550px] xl:ml-[750px]">
      <div className="hidden md:block h-full ">
        <i className="iconfont icon-sousuo text-2xl text-white align-middle mr-2"></i>
        <input
          placeholder="搜索文章"
          type="text"
          className="bg-transparent outline-none focus:border-b-[1px] focus:border-blue-500 caret-gray-900"
        />
      </div>

      <i className="iconfont icon-sousuo md:hidden"></i>
    </div>
  );
});
