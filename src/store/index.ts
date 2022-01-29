/*
 * @Date: 2022-01-24 16:48:40
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 21:08:55
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import { loginAction } from './actionCreators';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export { loginAction };

export default store;