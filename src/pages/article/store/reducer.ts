/*
 * @Date: 2022-01-24 16:51:09
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 16:01:35
 */
import { Map } from "immutable";
import * as actionTypes from "./constant";
import type { ActionType } from "@/store/types";

const initState = Map({
  articleInfo: {} as any,
});

export default function (state = initState, action: ActionType) {
  switch (action.type) {
    case actionTypes.CHANGE_ARTICLEINFO:
      return state.set("articleInfo", action.value);
    default:
      return state;
  }
}
