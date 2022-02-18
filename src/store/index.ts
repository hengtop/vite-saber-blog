/*
 * @Date: 2022-01-24 16:48:40
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-18 23:31:55
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import { loginAction, getLabelAction, changeKeyword } from './actionCreators';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export { loginAction, getLabelAction, changeKeyword };

export default store;
