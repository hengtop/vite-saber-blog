import React, { memo, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadLocalStore } from '@/store/actionCreators';
import routes from './router';

function App() {
  //数据持久化
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStore());
  }, []);
  //这个钩子要写在路由组件中
  const element = useRoutes(routes);
  return <div className="App overflow-auto">{element}</div>;
}

export default memo(App);
