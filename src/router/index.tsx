/*
 * @Date: 2022-01-23 20:15:56
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-23 22:36:52
 */
import React, { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: () => import('@/pages/home')
  },
  {
    path: '/article/:articleId',
    element: () => import('@/pages/article')
  },
  {
    path: '/profile/:userId',
    element: () => import('@/pages/profile')
  }
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
    <Suspense fallback={<div>路由懒加载...</div>}>
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
