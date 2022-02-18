/*
 * @Date: 2022-01-24 12:52:24
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-18 23:06:23
 */
import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { changeQueryInfoAction } from '../../store';
import type { AppState } from '@/store/reducer';
import { useSearchParams } from 'react-router-dom';

import ArticleCard from '@/components/ArticleCard';
import PageComponent from '@/components/PageComponent';

export default memo(function index(props: any) {
  const { articleList } = props;

  //redux hooks
  const { queryInfo, articleTotalCount } = useSelector(
    (state: AppState) => ({
      queryInfo: state.getIn(['home', 'queryInfo']),
      articleTotalCount: state.getIn(['home', 'articleTotalCount'])
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  //other hooks
  //获取query参数
  const [searchParams] = useSearchParams();
  console.log();
  const getCurrentPage = (currentPage: number) => {
    //保存搜索query
    dispatch(
      changeQueryInfoAction({
        ...(queryInfo as any),
        keyword: searchParams.get('query'),
        limit: 5,
        offset: (currentPage - 1) * 5
      })
    );
  };
  //根据总数和limit计算实际页面数
  const totalPage = (totalCount: number) => {
    return Math.ceil(totalCount / 5);
  };
  //总数
  const computedTotalPage = useMemo(
    () => totalPage(articleTotalCount as number),
    [articleTotalCount]
  );

  return (
    <div className="px-4 md:px-0">
      {articleList.length ? (
        articleList.map((item: any) => {
          return <ArticleCard articleInfo={item} key={item.id} />;
        })
      ) : (
        <div className="bg-white p-[24px]">一篇文章也没有</div>
      )}
      <PageComponent
        totalPage={computedTotalPage}
        currentPage={1}
        pageCallbackFn={getCurrentPage}
      />
    </div>
  );
});
