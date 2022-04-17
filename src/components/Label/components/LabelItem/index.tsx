/*
 * @Date: 2022-02-17 22:42:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-17 14:17:37
 */
import React, { memo } from 'react';
import type { PropsWithChildren, BaseSyntheticEvent } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeQueryInfoAction, changeCurrentPage } from '@/pages/home/store';

export type QueryType = 'label' | 'classify';
interface labelInfoType {
  id: number;
  name: string;
}
interface propsType {
  labelInfo: labelInfoType;
  queryType: QueryType;
  textColor?: string;
  bgColor?: string;
}

export default memo(function index(props: PropsWithChildren<propsType>) {
  //props/state
  const { labelInfo, queryType, textColor = 'text-[#1e80ff]', bgColor = ' bg-[#eaf2ff]' } = props;

  //redux hooks
  const dispatch = useDispatch();

  //other hooks
  const navigate = useNavigate();
  const articleSearchParams = createSearchParams({
    [queryType]: labelInfo?.name,
    [queryType + 'Id']: labelInfo?.id + '',
  });

  //其他逻辑
  //根据分类或者标签跳转到对应的文章栏
  const searchArticleQuery = (e: BaseSyntheticEvent) => {
    //首先将分页查询的参数还原，保证查询数据是从第一条开始的
    dispatch(changeQueryInfoAction({}));
    dispatch(changeCurrentPage(1));
    navigate('/?' + articleSearchParams.toString());
    e.stopPropagation();
  };

  return (
    <span
      onClick={searchArticleQuery}
      key={labelInfo.id}
      className={`inline-block px-[8px] py-[3px] ${bgColor} ${textColor} rounded cursor-pointer whitespace-nowrap mx-[5px] my-[3px]`}
    >
      {labelInfo.name}
    </span>
  );
});
