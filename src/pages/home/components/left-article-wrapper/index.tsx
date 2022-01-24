/*
 * @Date: 2022-01-24 12:52:24
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 23:07:49
 */
import React, { memo } from 'react';
import ArticleCard from '@/components/Article-Card';

export default memo(function index(props: any) {
  const { articleList } = props;
  //other hooks
  return (
    <div className="">
      {articleList.map((item: any) => {
        return <ArticleCard articleInfo={item} key={item.id} />;
      })}
    </div>
  );
});
