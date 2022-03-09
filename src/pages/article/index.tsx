/*
 * @Date: 2022-01-23 20:11:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-09 23:22:43
 */
import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getArticleInfoByIdAction } from './store';
import { testTokenAction } from '@/store/actionCreators';
import type { AppState } from '@/store/reducer';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/LeftArticleWrapper';
import RightArticleWrapper from '@/components/RightArticleWrapper';
import NavigationContainer from './components/NavigationContainer';

export default memo(function index() {
  //props/state

  //redux hooks
  const dispatch = useDispatch();
  const { articleInfo } = useSelector(
    (state: AppState) => ({
      articleInfo: state.getIn(['article', 'articleInfo'])
    }),
    shallowEqual
  );

  //other hooks
  const params = useParams();
  useEffect(() => {
    params.articleId && dispatch(getArticleInfoByIdAction(params.articleId));
  }, [dispatch, params.articleId]);

  //其他逻辑
  const { text = '', title = '', classifys = [], labels = [] } = articleInfo as any;

  //测试登录
  const testClickHandle = () => {
    //测试token
    dispatch(testTokenAction());
  };

  return (
    <>
      <Container
        leftSlot={
          <LeftArticleWrapper text={text} title={title} classifys={classifys} labels={labels} />
        }
        rightSlot={<RightArticleWrapper navigationContainer={<NavigationContainer />} />}
      />
      <button onClick={testClickHandle} className="bg-white">
        测试是否登录
      </button>
    </>
  );
});
