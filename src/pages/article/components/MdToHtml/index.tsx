import React, { memo, useEffect, useState } from 'react';
import type { PropsWithChildren, BaseSyntheticEvent } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoSlider } from 'react-photo-view';
import showdown from 'showdown';
import * as ShowdownXss from 'showdown-xss-filter';
import showdownHighlight from 'showdown-highlight';

interface MdToHtmlPropsType {
  mdStr: string;
  title: string;
  isMounted?: (value: boolean) => void;
}

interface DataType {
  key: number | string;
  src?: string;
}

export default memo(function index(props: PropsWithChildren<MdToHtmlPropsType>) {
  //props/state
  const { mdStr, title, isMounted } = props;
  //图片预览,预览图片是否显示，预览图片索引，预览图片列表
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [imageList, setImageList] = useState<DataType[]>([]);
  //redux hooks

  //other hooks
  useEffect(() => {
    isMounted && isMounted(true);
    handleImageList();
    return () => {
      isMounted && isMounted(false);
    };
  }, [mdStr, title]);

  //其他逻辑
  //转换md格式的数据为html
  //console.log(mdStr);
  const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    //目前发现加上了这个xss扩展有点卡，后续考虑优化
    extensions: [
      showdownHighlight({
        pre: false
      })
    ]
  });
  const htmlStr = converter.makeHtml(mdStr);
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
