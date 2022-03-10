import React, { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadLocalStore } from '@/store/actionCreators';

import Header from '@/components/Header';

function App() {
  //数据持久化
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStore());
  }, []);
  //这个钩子要写在路由组件中
  return (
    <div>
      <Header></Header>
      {/* 渲染子组件 */}
      <Outlet />
    </div>
  );
}

export default memo(App);
