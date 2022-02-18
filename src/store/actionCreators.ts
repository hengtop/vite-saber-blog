/*
 * @Date: 2022-01-28 15:56:34
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-18 23:31:47
 */
/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 16:02:27
 */

import * as actionTypes from './constant';
import { login, getUserInfo } from '@/network/api/login';
import { getLabel } from '@/network/api/label';
import { toast } from 'react-toastify';
import type { loginType, LabelQueryType } from '@/network/config/types';
import localStore from '@/utils/localStore';
import type { ActionType } from './types';

export const changeTokenAction = (res: string): ActionType => ({
  type: actionTypes.CHANGE_TOKEN,
  value: res
});
export const changeRefreshTokenAction = (res: string): ActionType => ({
  type: actionTypes.CHANGE_REFRESHTOKEN,
  value: res
});

export const changeUserIdAction = (res: number): ActionType => ({
  type: actionTypes.CHANGE_USERID,
  value: res
});

export const changeUserInfoAction = (res: any): ActionType => ({
  type: actionTypes.CHANGE_USERINFO,
  value: res
});

export const changeLabelAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_LABEL,
  value: res
});

export const changeKeyword = (res: string): ActionType => ({
  type: actionTypes.CHANGE_KEYWORD,
  value: res
});

export const getUserInfoAction = (id: number) => {
  return async (dispatch: any) => {
    /* issue 这里注意修改下后端字段将user放在data中 */
    const { user } = await getUserInfo(id);
    dispatch(changeUserInfoAction(user));
    localStore.setLocalStore('userInfo', user);
  };
};

export const getLabelAction = (query?: LabelQueryType) => {
  return async (dispatch: any) => {
    const {
      data: { list }
    } = await getLabel(query);
    dispatch(changeLabelAction(list));
  };
};

export const loginAction = (query: loginType) => {
  return async (dispatch: any) => {
    const {
      data: { token, refreshToken, id }
    } = await login(query);
    toast.success('登陆成功', {
      hideProgressBar: true,
      autoClose: 1500,
      position: 'top-right'
    });
    //保存
    dispatch(changeTokenAction(token));
    localStore.setLocalStore('token', token);
    dispatch(changeRefreshTokenAction(refreshToken));
    localStore.setLocalStore('refreshToken', refreshToken);
    dispatch(changeUserIdAction(id));
    localStore.setLocalStore('userId', id);
    dispatch(getUserInfoAction(id));
  };
};

//设置数据持久化

export const loadLocalStore = () => {
  const token = localStore.getLocalStore('token');
  const refreshToken = localStore.getLocalStore('refreshToken');
  const userId = localStore.getLocalStore('userId');
  const userInfo = localStore.getLocalStore('userInfo');
  return (dispatch: any) => {
    if (token) {
      dispatch(changeTokenAction(token));
    }
    if (refreshToken) {
      dispatch(changeRefreshTokenAction(refreshToken));
    }
    if (userId) {
      dispatch(changeUserIdAction(userId));
    }
    if (userInfo) {
      dispatch(changeUserInfoAction(userInfo));
    }
  };
};
