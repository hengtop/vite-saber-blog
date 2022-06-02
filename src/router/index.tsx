/*
 * @Date: 2022-01-23 20:15:56
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-05-26 22:47:53
 */
import React, { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import LazyLoading from '@/components/LazyLoading';

const routes: RouteObject[] = [
  {
    path: '/*',
    element: () => import('@/pages/main'),
    children: [
      { path: '', element: () => import('@/pages/home') },
      {
        path: 'article/:articleId',
        element: () => import('@/pages/article'),
      },
    ],
  },
  {
    path: '/signup',
    element: () => import('@/pages/signUp'),
  },
  {
    path: '/updatelog',
    element: () => import('@/pages/updateLog'),
  },
];

type lazyPropsType = () => Promise<{ default: React.ComponentType }>;
interface propsType {
  importRoute: lazyPropsType;
}

//定义自动包裹Suspense函数
function LazyElement(props: propsType) {
  const { importRoute } = props;
  const LazyComponent = lazy(importRoute);
  return (
    <Suspense fallback={<LazyLoading />}>
      <LazyComponent />
    </Suspense>
  );
}

// 处理routes 如果element是懒加载，要包裹Suspense
function dealRoutes(routesArr: RouteObject[]) {
  if (routesArr && Array.isArray(routesArr) && routesArr.length > 0) {
    routesArr.forEach((route) => {
      if (route.element && typeof route.element == 'function') {
        const importRoute = route.element as lazyPropsType;
        route.element = <LazyElement importRoute={importRoute} />;
      }
      if (route.children) {
        dealRoutes(route.children);
      }
    });
  }
}
dealRoutes(routes);

export default routes;
