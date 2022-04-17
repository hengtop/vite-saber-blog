/*
 * @Date: 2022-01-24 16:48:40
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-17 13:27:45
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import {
  loginAction,
  loadLocalStore,
  getLabelAction,
  changeKeyword,
  testTokenAction,
  changeTokenAction,
  getUserInfoAction,
  changeIsFirstLoginAction,
} from './actionCreators';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// 浏览器控制台调试专用
//window.__store = store;

export {
  loginAction,
  getLabelAction,
  changeKeyword,
  testTokenAction,
  changeTokenAction,
  loadLocalStore,
  getUserInfoAction,
  changeIsFirstLoginAction,
};

export default store;
