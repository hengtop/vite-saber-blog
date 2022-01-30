/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-31 00:23:45
 */
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLabelAction } from '@/store';
import type { AppState } from '@/store/reducer';

export default memo(function index() {
  // redux hooks
  const dispatch = useDispatch();
  const { label } = useSelector((state: AppState) => ({
    label: state.getIn(['main', 'label'])
  }));
  //other hooks
  useEffect(() => {
    dispatch(getLabelAction({ offset: 0, limit: 20 }));
  }, [dispatch]);
  return (
    <div className="bg-white p-[15px] border-t-2 border-[#F4f5f6]">
      {(label as any[]).map((item) => {
        return (
          <span
            key={item.id}
            className="inline-block px-[5px] whitespace-nowrap bg-[#bfa] mx-[5px] my-[3px] rounded"
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
});
