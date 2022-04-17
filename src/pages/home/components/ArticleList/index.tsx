/*
 * @Date: 2022-02-27 18:11:25
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-17 13:57:04
 */
import React, { memo, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  useEffect(() => {
    isMounted && isMounted(true);
    return () => {
      isMounted && isMounted(false);
    };
  }, [articleList]);
  //其他逻辑
  //跳转
  const onNavigateTo = (id: number) => {
    navigate('/article/' + id);
  };

  return (
    <>
      {articleList.length ? (
        articleList.map((item: any) => {
          return (
            <div onClick={() => onNavigateTo(item.id)} key={item.id}>
              <ArticleCard articleInfo={item} />
            </div>
          );
        })
      ) : (
        <div className="bg-white p-[24px]">一篇文章也没有</div>
      )}
    </>
  );
});
