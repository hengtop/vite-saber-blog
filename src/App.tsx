import React, { memo, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadLocalStore } from '@/store/actionCreators';
import routes from './router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //数据持久化
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLocalStore());
  }, []);
  //这个钩子要写在路由组件中
  const element = useRoutes(routes);
  return (
    <>
      <div className="App overflow-auto">{element}</div>
      <ToastContainer limit={2} />
    </>
  );
}

export default memo(App);
