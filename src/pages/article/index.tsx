/*
 * @Date: 2022-01-23 20:11:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-10 23:43:39
 */
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getArticleInfoByIdAction } from './store';
import { testTokenAction } from '@/store/actionCreators';
import type { AppState } from '@/store/reducer';
import { handleClickHiddenEvent as sendNavigateHtml } from '@/utils/events';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/LeftArticleWrapper';
import RightArticleWrapper from '@/components/RightArticleWrapper';
import NavigationContainer from './components/NavigationContainer';

export default memo(function index() {
  //props/state
  //从文章渲染组件传递过来的导航dom字符串
  const [htmlStr, setHtmlStr] = useState('');

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
    sendNavigateHtml.on('sendNavigateHtml', getNavigateDom);
    return () => {
      sendNavigateHtml.removeListener('sendNavigateHtml', getNavigateDom);
    };
  }, [dispatch, params.articleId]);

  //其他逻辑
  const { text = '', title = '', classifys = [], labels = [] } = articleInfo as any;

  //测试登录
  const testClickHandle = () => {
    //测试token
    dispatch(testTokenAction());
  };
  const getNavigateDom = (htmlStr: string) => {
    setHtmlStr(htmlStr);
  };

  return (
    <>
      <Container
        leftSlot={
          <LeftArticleWrapper text={text} title={title} classifys={classifys} labels={labels} />
        }
        rightSlot={
          <RightArticleWrapper navigationContainer={<NavigationContainer htmlStr={htmlStr} />} />
        }
      />
      <button onClick={testClickHandle} className="bg-white">
        测试是否登录
      </button>
    </>
  );
});
