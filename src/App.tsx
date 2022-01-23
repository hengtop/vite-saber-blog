import React, { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';

import Header from './components/Header';

function App() {
  //这个钩子要写在路由组件中
  const element = useRoutes(routes);
  return (
    <div className="App">
      <Header></Header>
      {element}
    </div>
  );
}

export default memo(App);
