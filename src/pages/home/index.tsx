/*
 * @Date: 2022-01-23 20:11:01
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-24 19:10:48
 */

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllArticleAction } from './store';
import type { AppState } from '@/store/reducer';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/left-article-wrapper';
import RightArticleWrapper from './components/right-article-wrapper';

export default memo(function index() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const { articleList } = useSelector(
    (state: AppState) => ({
      /* issue 这里的state有类型问题，不能进行完整的类型暗示 */
      articleList: state.getIn(['home', 'articleList'])
    }),
    shallowEqual
  );
  //other hooks
  useEffect(() => {
    dispatch(getAllArticleAction());
  }, [dispatch]);
  //其他逻辑
  return (
    <Container
      leftSlot={<LeftArticleWrapper articleList={articleList} />}
      rightSlot={<RightArticleWrapper />}
    ></Container>
  );
});
