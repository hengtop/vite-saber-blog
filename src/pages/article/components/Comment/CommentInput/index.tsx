/*
 * @Date: 2022-04-04 19:04:06
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 20:12:02
 */
import React, { memo, useState } from 'react';

import { useSelector, shallowEqual } from 'react-redux';

import type { AppState } from '@/store/reducer';

export default memo(function index() {
  //props/state
  const [content, setContent] = useState();

  //redux hooks
  const { userInfo } = useSelector(
    (state: AppState) => ({
      userInfo: state.getIn(['main', 'userInfo']),
      keyword: state.getIn(['main', 'keyword']),
    }),
    shallowEqual,
  );

  //other hooks

  //其他逻辑

  return (
    <div>
      <div className="flex">
        <img
          className="w-[36px] h-[36px] rounded-full mt-[10px] mr-[20px]"
          src={(userInfo as any).avatar_url}
        />
        <textarea className="form-textarea flex-1 resize-none !rounded !border-transparent outline-transparent !bg-[#f2f3f5]"></textarea>
      </div>
      <div className="w-full text-right mt-[10px]">
        <span className="px-[12px] py-[5px] bg-[#1e80ff] rounded text-white cursor-pointer">
          发表
        </span>
      </div>
    </div>
  );
});
