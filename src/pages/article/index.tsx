/*
 * @Date: 2022-01-23 20:11:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-31 00:09:54
 */
import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getArticleInfoByIdAction } from './store';
import type { AppState } from '@/store/reducer';

import Container from '@/components/Container';
import MdToHtml from './components/MdToHtml';
import RightArticleWrapper from '@/components/RightArticleWrapper';

export default memo(function index() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const { articleInfo } = useSelector((state: AppState) => ({
    articleInfo: state.getIn(['article', 'articleInfo'])
  }));

  //other hooks
  const params = useParams();
  useEffect(() => {
    params.articleId && dispatch(getArticleInfoByIdAction(params.articleId));
  }, [dispatch, params.articleId]);

  //其他逻辑
  const { text = '', title = '' } = articleInfo as any;

  return (
    <Container
      leftSlot={<MdToHtml mdStr={text} title={title} />}
      rightSlot={<RightArticleWrapper />}
    />
  );
});
