/*
 * @Date: 2022-01-23 20:11:01
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-25 23:57:28
 */

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllArticleAction } from './store';
import type { AppState } from '@/store/reducer';
import type { queryArticle } from '@/network/config/types';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/left-article-wrapper';
import RightArticleWrapper from './components/right-article-wrapper';

export default memo(function index() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const { articleList, queryInfo } = useSelector(
    (state: AppState) => ({
      /* issue 这里的state有类型问题，不能进行完整的类型暗示 */
      articleList: state.getIn(['home', 'articleList']),
      queryInfo: state.getIn(['home', 'queryInfo'])
    }),
    shallowEqual
  );
  //other hooks
  useEffect(() => {
    dispatch(getAllArticleAction(queryInfo as queryArticle));
  }, [dispatch, queryInfo]);
  //其他逻辑
  return (
    <Container
      leftSlot={<LeftArticleWrapper articleList={articleList} />}
      rightSlot={<RightArticleWrapper />}
    />
  );
});
