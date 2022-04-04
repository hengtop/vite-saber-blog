/*
 * @Date: 2022-01-24 19:19:53
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-04 19:17:03
 */
import React, { memo, PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showTimeNow } from '@/utils/timeFormat';

import LabelItem from '@/components/Label/components/LabelItem';

export interface CardType {
  articleInfo: any;
}

export default memo(function index(props: PropsWithChildren<CardType>) {
  //props/state
  const {
    articleInfo: {
      cover,
      updateAt,
      id,
      like,
      text,
      title,
      views,
      userInfo: { name = '文章作者' },
      labels,
    },
  } = props;
  const [isHighlight, setIsHighlight] = useState(false);
  //redux hooks
  //other hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //获取搜素query
  const searchKeyword = searchParams.get('query');
  //其他逻辑
  //将获取到的text先解析为html文本然后再转为纯文本
  const stringText = text.replace(/<[^>]*>|/g, '');

  //在渲染完成后将搜索关键字高亮
  useEffect(() => {
    if (searchKeyword) {
      setIsHighlight(true);
    } else {
      setIsHighlight(false);
    }
  }, [searchKeyword]);

  const renderHighLightHtml = (str: string, keyword: string) => {
    const htmlStr =
      isHighlight && keyword
        ? str.replace(
            new RegExp(keyword as string, 'gi'),
            `<span style="color: red">${keyword}</span>`,
          )
        : str;
    return {
      __html: htmlStr,
    };
  };
  //渲染标题和文件简介内容
  const renderTitle = renderHighLightHtml(title, searchKeyword as string);
  const renderText = renderHighLightHtml(stringText.slice(0, 550), searchKeyword as string);
  return (
    <div
      onClick={() => {
        navigate('/article/' + id);
      }}
      className="transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer w-full h-[114px] sm:h-[145px] md:h-[188px] rounded md:rounded-md flex overflow-hidden mb-4 bg-white"
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
        <div className="truncate font-bold">
          <span
            className="text-lg md:text-xl text-gray-800"
            dangerouslySetInnerHTML={renderTitle}
          ></span>
        </div>
        <p
          className="my-2 leading-6 text-gray-500  text-sm md:text-base line-clamp-1 sm:line-clamp-2 h-[24px] sm:h-[48px] md:line-clamp-3 md:h-[72px] overflow-hidden overflow-ellipsis"
          dangerouslySetInnerHTML={renderText}
        ></p>
        <div className="box-content flex items-center h-[22px] md:h-[36px] pt-1 sm:pt-2 md:pt-1 border-t-[1px] mt-4 md:mt-5 text-align text-xs md:text-sm text-gray-400 truncate">
          <i className="iconfont icon-yonghu-xianxing text-gray-400 pr-2"></i>
          <span className="pr-2">{name}</span>
          <i className="iconfont icon-shijian  text-gray-400 pr-2"></i>
          <span>{showTimeNow(updateAt)}</span>
          <div className="inline-block ml-[10px]">
            {labels &&
              labels.map((item: any) => {
                return <LabelItem key={item.id} labelInfo={item} queryType={'label'} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
});
