/*
 * @Date: 2022-01-23 20:11:01
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-17 13:40:51
 */

import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getAllArticleAction, getArticleByQueryAction } from './store';
import type { AppState } from '@/store/reducer';
import type { queryArticle } from '@/network/config/types';
import { useSearchParams } from 'react-router-dom';
import type { QueryType } from '@/components/Label/components/LabelItem';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/left-article-wrapper';
import RightArticleWrapper from '../../components/RightArticleWrapper';

export default memo(function index() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const { articleList, queryInfo } = useSelector(
    (state: AppState) => ({
      /* issue 这里的state有类型问题，不能进行完整的类型暗示 */
      articleList: state.getIn(['home', 'articleList']),
      queryInfo: state.getIn(['home', 'queryInfo']),
    }),
    shallowEqual,
  );
  //other hooks
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('query');
  useEffect(() => {
    const queryType =
      searchParams.toString().match('label') ?? searchParams.toString().match('classify');
    const queryTypeId = searchParams.get('labelId') ?? searchParams.get('classifyId');

    //查询对应标签或者分类下的文章 或者查询全部文章
    queryType && queryTypeId
      ? dispatch(
          getArticleByQueryAction(
            queryTypeId,
            queryType[0] as QueryType,
            queryInfo as queryArticle,
          ),
        )
      : dispatch(
          getAllArticleAction({
            ...(queryInfo as queryArticle),
            keyword: searchKeyword as string,
          }),
        );
  }, [dispatch, queryInfo, searchParams]);
  //其他逻辑
  return (
    <Container
      leftSlot={<LeftArticleWrapper articleList={articleList} />}
      rightSlot={<RightArticleWrapper />}
    />
  );
});
