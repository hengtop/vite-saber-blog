/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-20 18:12:21
 */
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLabelAction } from '@/store';
import type { AppState } from '@/store/reducer';

import Label from '../Label';
import LabelListSkeleton from '@/components/Skeleton/LabelListSkeleton';

export default memo(function index() {
  // redux hooks
  const dispatch = useDispatch();
  const { label, labelLoading } = useSelector(
    (state: AppState) => ({
      label: state.getIn(['main', 'label']),
      labelLoading: state.getIn(['main', 'labelLoading'])
    }),
    shallowEqual
  );
  //other hooks
  useEffect(() => {
    dispatch(getLabelAction({ offset: 0, limit: 20 }));
  }, [dispatch]);
  return (
    <div className="bg-white mx-[16px] md:m-0 p-[15px] rounded-b xl:rounded">
      {labelLoading ? <LabelListSkeleton /> : <Label label={label as any[]} />}
    </div>
  );
});
