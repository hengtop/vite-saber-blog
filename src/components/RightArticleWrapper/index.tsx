/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-10 23:35:14
 */
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLabelAction } from '@/store';
import type { AppState } from '@/store/reducer';

import Label from '../Label';

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
    <div className="bg-white p-[15px] rounded-b xl:rounded">
      <Label label={label as any[]} />
    </div>
  );
});
