/*
 * @Date: 2022-01-24 19:19:53
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-25 22:43:53
 */
import React, { memo, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardType {
  articleInfo: any;
}

export default memo(function index(props: PropsWithChildren<CardType>) {
  //props/state
  const {
    articleInfo: { cover, updateAt, id, like, text, title, views }
  } = props;

  //redux hooks

  //other hooks
  const navigate = useNavigate();
  //其他逻辑

  return (
    <div
      onClick={() => {
        navigate('/article/' + id);
      }}
      className="transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer w-full h-28 sm:h-36 md:h-44 rounded md:rounded-md flex overflow-hidden mb-4 bg-white"
    >
      {cover ? (
        <div className="basis-1/3 min-w-[33.333%]">
          <img
            className="w-full h-full object-cover"
            src="https://www.iotheme.cn/wp-content/uploads/2021/09/iotheme_9_18_promotions.png"
            alt=""
          />
        </div>
      ) : (
        ''
      )}
      {/* issue 文本省略总结 */}
      <div className="flex-auto py-2 md:py-4 px-4 overflow-hidden overflow-ellipsis">
        <h3 className="truncate">
          <span className="text-lg md:text-xl text-gray-800">{title}</span>
        </h3>
        <p className="my-2 leading-6 text-gray-500  text-sm md:text-base line-clamp-1 sm:line-clamp-2 sm:h-[48px] md:line-clamp-3 md:h-[72px] overflow-hidden overflow-ellipsis">
          {text}
        </p>
        <div className="box-content pt-1 sm:pt-2 md:pt-1 border-t-[1px] mt-4 md:mt-5 text-align text-xs md:text-sm text-gray-400 truncate">
          <i className="iconfont icon-yonghu-xianxing text-gray-400 pr-2"></i>
          <span className="pr-2">zhangheng</span>
          <span>你好大稍等哈松平定hi哦啊是等哈说</span>
        </div>
      </div>
    </div>
  );
});