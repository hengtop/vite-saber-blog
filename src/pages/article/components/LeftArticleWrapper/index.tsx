/*
 * @Date: 2022-02-17 21:24:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-21 02:08:42
 */
import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import type { PropsWithChildren } from 'react';
import type { AppState } from '@/store/reducer';

import MdToHtml from '../MdToHtml';
import LabelItem from '@/components/Label/components/LabelItem';
import ArticleDetailSkeleton from '@/components/Skeleton/ArticleDetailSkeleton';

interface propsType {
  title: string;
  text: string;
  classifys: any[];
  labels: any[];
}

export default memo(function index(props: PropsWithChildren<propsType>) {
  //props/state
  const { title, text, labels, classifys } = props;
  console.log(classifys);

  //redux hooks
  const { articleDetailLoading } = useSelector((state: AppState) => ({
    articleDetailLoading: state.getIn(['article', 'articleDetailLoading'])
  }));

  //other hooks

  //其他逻辑

  return (
    <>
      {articleDetailLoading ? (
        <ArticleDetailSkeleton />
      ) : (
        <>
          <MdToHtml mdStr={text} title={title} />
          <div className="bg-white px-[32px] pb-[20px] mb-[10px] flex items-center rounded-b">
            <span className="mr-[5px]">分类: </span>
            {classifys &&
              classifys.map((item: any) => {
                return <LabelItem key={item.id} labelInfo={item} queryType={'classify'} />;
              })}
            <span className="ml-[30px] mr-[5px]">标签:</span>
            {labels &&
              labels.map((item: any) => {
                return <LabelItem key={item.id} labelInfo={item} queryType={'label'} />;
              })}
          </div>
        </>
      )}
    </>
  );
});
