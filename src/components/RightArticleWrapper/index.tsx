/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 15:29:16
 */
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLabelAction } from '@/store';
import type { AppState } from '@/store/reducer';
import type { PropsWithChildren } from 'react';

import Label from '../Label';
import LabelListSkeleton from '@/components/Skeleton/LabelListSkeleton';

interface RightArticleType {
  navigationContainer?: any;
}

export default memo(function index(props: PropsWithChildren<RightArticleType>) {
  //设置几个插槽
  const { navigationContainer } = props;
  // redux hooks
  const dispatch = useDispatch();
  const { label, labelLoading } = useSelector(
    (state: AppState) => ({
      label: state.getIn(['main', 'label']),
      labelLoading: state.getIn(['main', 'labelLoading']),
    }),
    shallowEqual,
  );
  //other hooks
  useEffect(() => {
    dispatch(getLabelAction({ offset: 0, limit: 20 }));
  }, [dispatch]);
  return (
    <>
      <div className="bg-white rounded-b xl:rounded">
        {labelLoading ? <LabelListSkeleton /> : <Label label={label as any[]} />}
      </div>
      {navigationContainer}
    </>
  );
});
