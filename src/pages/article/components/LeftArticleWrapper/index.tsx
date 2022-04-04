/*
 * @Date: 2022-02-17 21:24:41
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 21:23:44
 */
import React, { memo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import type { PropsWithChildren } from 'react';
import type { AppState } from '@/store/reducer';

import MdToHtml from '../MdToHtml';
import LabelItem from '@/components/Label/components/LabelItem';
import ArticleDetailSkeleton from '@/components/Skeleton/ArticleDetailSkeleton';
import Comment from '../Comment';
import classNames from 'classnames';

interface propsType {
  title: string;
  text: string;
  classifys: any[];
  labels: any[];
  commentList: any[];
  getDomRenderObj: (arg: any) => void;
}

export default memo(function index(props: PropsWithChildren<propsType>) {
  //props/state
  const { title, text, labels, classifys, commentList, getDomRenderObj } = props;
  const [isArticleDetailMounted, setIsArticleDetailMounted] = useState(false);

  //redux hooks
  const { articleDetailLoading } = useSelector(
    (state: AppState) => ({
      articleDetailLoading: state.getIn(['article', 'articleDetailLoading']),
    }),
    shallowEqual,
  );

  //other hooks

  //其他逻辑
  //判断文章是否加载完毕
  const handleIsArticleDetailMounted = (value: boolean) => {
    setIsArticleDetailMounted(value);
  };

  return (
    <>
      <ArticleDetailSkeleton
        className={classNames({ hidden: !articleDetailLoading && isArticleDetailMounted })}
      />
      <div className={classNames({ hidden: articleDetailLoading || !isArticleDetailMounted })}>
        <MdToHtml
          htmlStr={text}
          title={title}
          isMounted={handleIsArticleDetailMounted}
          getDomRenderObj={getDomRenderObj}
        />
        <div className="bg-white px-[32px] pb-[20px] mb-[10px] flex items-center rounded-b flex-wrap">
          <div>
            <span className="mr-[5px]">分类: </span>
            {classifys &&
              classifys.map((item: any) => {
                return <LabelItem key={item.id} labelInfo={item} queryType={'classify'} />;
              })}
          </div>
          <div>
            <span className="mr-[5px]">标签:</span>
            {labels &&
              labels.map((item: any) => {
                return <LabelItem key={item.id} labelInfo={item} queryType={'label'} />;
              })}
          </div>
        </div>
        <Comment commentList={commentList} />
      </div>
    </>
  );
});
