/*
 * @Date: 2022-01-24 12:55:20
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 18:35:12
 */
import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';

import TitleCard from '../TitleCard';
import LabelItem from './components/LabelItem';

interface LabelPropsType {
  label: any[];
}

export default memo(function index(props: PropsWithChildren<LabelPropsType>) {
  const { label } = props;
  return (
    <TitleCard title="热门标签">
      <>
        {label.length
          ? (label as any[]).map((item) => {
              return <LabelItem key={item.id} labelInfo={item} queryType={'label'} />;
            })
          : '暂无标签'}
      </>
    </TitleCard>
  );
});
