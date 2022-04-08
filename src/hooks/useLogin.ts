/*
 * @Date: 2022-04-08 22:38:22
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-09 00:17:14
 */
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import type { AppState } from '@/store/reducer';

export const useLogin = (): [boolean, any] => {
  const { userInfo } = useSelector(
    (state: AppState) => ({
      userInfo: state.getIn(['main', 'userInfo']),
    }),
    shallowEqual,
  );
  return [!!Object.keys(userInfo as any).length, userInfo];
};
