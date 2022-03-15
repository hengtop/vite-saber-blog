import React, { memo, useEffect, useState } from 'react';
import type { PropsWithChildren, BaseSyntheticEvent } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoSlider } from 'react-photo-view';
import md2Navigate from '@/utils/md2Navigate';

interface MdToHtmlPropsType {
  htmlStr: string;
  title: string;
  getDomRenderObj: (value: any) => void;
  isMounted?: (value: boolean) => void;
}

interface DataType {
  key: number | string;
  src?: string;
}

export default memo(function index(props: PropsWithChildren<MdToHtmlPropsType>) {
  //props/state
  const { htmlStr, title, isMounted, getDomRenderObj } = props;
  //图片预览,预览图片是否显示，预览图片索引，预览图片列表
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageList, setImageList] = useState<DataType[]>([]);
  //提取出h标签
  const domRenderObj = md2Navigate(htmlStr);
  //redux hooks

  //other hooks
  useEffect(() => {
    isMounted && isMounted(true);
    handleImageList();
    getDomRenderObj(domRenderObj);
    return () => {
      isMounted && isMounted(false);
    };
  }, [htmlStr, title]);

  const createHtml = (htmlStr: string) => {
    return {
      __html: htmlStr
    };
  };

  //获取文章中的img图片
  const handleImageList = () => {
    const list: DataType[] = [];
    document.querySelectorAll('.articleHtml img').forEach((item, index) => {
      list.push({
        key: index,
        src: (item as HTMLImageElement).src
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

  return (
    <div className="p-8 md:p-[32px] md:rounded pb-[40px] bg-white articleHtml">
      <h1 className="font-black text-4xl mb-[20px]">{title}</h1>
      <div dangerouslySetInnerHTML={createHtml(htmlStr)} onClick={textClickHandle}></div>
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
