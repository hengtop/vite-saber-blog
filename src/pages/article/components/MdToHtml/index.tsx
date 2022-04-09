import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import type { PropsWithChildren, BaseSyntheticEvent } from 'react';

import { PhotoSlider } from 'react-photo-view';
import md2Navigate from '@/utils/md2Navigate';
import { useLogin } from '@/hooks/useLogin';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-photo-view/dist/react-photo-view.css';

interface MdToHtmlPropsType {
  htmlStr: string;
  title: string;
  articleUserInfo: any;
  getDomRenderObj: (value: any) => void;
  isMounted?: (value: boolean) => void;
}

interface DataType {
  key: number | string;
  src?: string;
}

type RenderHtmlType = { __html: string };

export default memo(function index(props: PropsWithChildren<MdToHtmlPropsType>) {
  //props/state
  const { htmlStr, title, isMounted, getDomRenderObj, articleUserInfo } = props;
  //图片预览,预览图片是否显示，预览图片索引，预览图片列表
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageList, setImageList] = useState<DataType[]>([]);
  const [renderHtml, setRenderHtml] = useState<RenderHtmlType>();
  //redux hooks
  const [isLogin, localUseInfo] = useLogin();

  //other hooks
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    isMounted && isMounted(true);
    handleImageList();
    setRenderHtml(createHtml(htmlStr));
    return () => {
      isMounted && isMounted(false);
    };
  }, [htmlStr, title]);

  // 将html处理成渲染的对象
  const createHtml = useCallback(
    (htmlStr: string) => {
      return {
        __html: htmlStr,
      };
    },
    [htmlStr],
  );
  useEffect(() => {
    getDomRenderObj(md2Navigate(htmlStr));
  }, [renderHtml]);

  //获取文章中的img图片
  const handleImageList = () => {
    const list: DataType[] = [];
    document.querySelectorAll('.articleHtml img').forEach((item, index) => {
      list.push({
        key: index,
        src: (item as HTMLImageElement).src,
      });
    });
    setImageList(list);
  };

  //处理文本点击，比如图片预览
  const textClickHandle = (e: BaseSyntheticEvent) => {
    if (e.target.nodeName === 'IMG') {
      //获取图片索引
      const index = imageList.findIndex((item) => {
        return item.src === e.target.src;
      });
      setIndex(index);
      setVisible(true);
    }
  };
  const onHandleEditClick = () => {
    // 打开新的窗口对文章进行编辑
    const searchQuery = `articleId=${params.articleId}${
      location.search ? '&' + location.search.split('?')[1] : ''
    }`;
    window.open('/admin/main/article/article-add?' + searchQuery, '_self');
  };
  return (
    <div className="p-8 md:p-[32px] md:rounded pb-[40px] bg-white articleHtml">
      <h1 className="font-black text-4xl !mb-[0px]">{title}</h1>
      <div className="text-right min-h-[25px] px-[20px]">
        {isLogin && articleUserInfo?.id === localUseInfo?.id && (
          <i
            className="iconfont icon-edit cursor-pointer"
            title="编辑本文"
            onClick={onHandleEditClick}
          ></i>
        )}
      </div>
      <hr className="mb-[25px]" />
      <div dangerouslySetInnerHTML={renderHtml} onClick={textClickHandle}></div>
      <PhotoSlider
        images={imageList}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
});
