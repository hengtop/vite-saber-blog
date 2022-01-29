/*
 * @Date: 2022-01-24 16:51:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 16:02:27
 */

import * as actionTypes from "./constant";
import { getArticleById } from "@/network/api/article";
import type { ActionType } from "@/store/types";

export const changeArticleInfoAction = (res: any[]): ActionType => ({
  type: actionTypes.CHANGE_ARTICLEINFO,
  value: res,
});

export const getArticleInfoByIdAction = (id: number | string) => {
  return async (dispatch: any) => {
    const { data } = await getArticleById(id);
    dispatch(changeArticleInfoAction(data));
  };
};
