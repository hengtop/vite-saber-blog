/*
 * @Date: 2022-02-27 18:11:25
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-27 20:09:44
 */
import React, { memo, useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import ArticleCard from '@/components/ArticleCard';

interface ArticleListType {
  articleList: any[];
  isMounted?: (vlaue: boolean) => void;
}

export default memo(function index(props: PropsWithChildren<ArticleListType>) {
  //props/state
  const { articleList, isMounted } = props;

  //redux hooks

  //other hooks

  //其他逻辑
  useEffect(() => {
    isMounted && isMounted(true);
    console.log('加载');
    return () => {
      isMounted && isMounted(false);
      console.log('卸载');
    };
  }, [articleList]);

  return (
    <>
      {articleList.length ? (
        articleList.map((item: any) => {
          return <ArticleCard articleInfo={item} key={item.id} />;
        })
      ) : (
        <div className="bg-white p-[24px]">一篇文章也没有</div>
      )}
    </>
  );
});
