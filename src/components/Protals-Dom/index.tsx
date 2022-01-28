/*
 * @Date: 2022-01-27 22:45:39
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-27 23:20:55
 */
import React, { memo } from 'react';

import ReactDOM from 'react-dom';

export default memo(function index(props) {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  const parent = document.getElementById('root');
  /* issue 这里有一个问题，我是用props中的children会报类型为定义，但是我手动声明还是会报错，这里暂时用rule规则避免解决 */
  return ReactDOM.createPortal(props.children, parent as HTMLElement);
});
