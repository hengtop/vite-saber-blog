/*
 * @Date: 2022-01-23 20:11:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-09 18:55:29
 */
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getArticleInfoByIdAction } from './store';
import { testTokenAction } from '@/store';
import { useTitle } from '@/hooks/useTitle';

import Container from '@/components/Container';
import LeftArticleWrapper from './components/LeftArticleWrapper';
import RightArticleWrapper from '@/components/RightArticleWrapper';
import NavigationContainer from './components/NavigationContainer';

import type { AppState } from '@/store/reducer';
import type { RenderObjType } from '@/utils/md2Navigate';

export default memo(function index() {
  //props/state
  //从文章渲染组件传递过来的导航dom数组
  const [domRenderObjArr, setDomRenderObjArr] = useState<RenderObjType[]>([]);

  //redux hooks
  const dispatch = useDispatch();
  const { articleInfo } = useSelector(
    (state: AppState) => ({
      articleInfo: state.getIn(['article', 'articleInfo']),
    }),
    shallowEqual,
  );

  //other hooks
  const params = useParams();
  useEffect(() => {
    params.articleId && dispatch(getArticleInfoByIdAction(params.articleId));
  }, [dispatch, params.articleId]);

  //其他逻辑
  const {
    text = '',
    title = '',
    classifys = [],
    labels = [],
    comments = [],
    userInfo,
  } = articleInfo as any;
  useTitle(title);

  //测试登录
  const testClickHandle = async () => {
    //测试token
    await dispatch(testTokenAction());
  };

  //获取孙子组件的中的domRenderObj
  const getDomRenderObj = (domRenderObjArr: any[]) => {
    setDomRenderObjArr(domRenderObjArr);
  };

  return (
    <>
      <Container
        leftSlot={
          <LeftArticleWrapper
            text={text}
            title={title}
            classifys={classifys}
            labels={labels}
            commentList={comments}
            articleUserInfo={userInfo}
            getDomRenderObj={getDomRenderObj}
          />
        }
        rightSlot={
          <RightArticleWrapper
            navigationContainer={<NavigationContainer domRenderObjArr={domRenderObjArr} />}
          />
        }
      />
      <button onClick={testClickHandle} className="bg-white">
        测试是否登录
      </button>
    </>
  );
});
