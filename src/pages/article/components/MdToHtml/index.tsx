import React, { memo, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

interface MdToHtmlPropsType {
  mdStr: string;
  title: string;
  isMounted?: (value: boolean) => void;
}

export default memo(function index(props: PropsWithChildren<MdToHtmlPropsType>) {
  //props/state
  const { mdStr, title, isMounted } = props;
  //redux hooks

  //other hooks
  useEffect(() => {
    isMounted && isMounted(true);
    return () => {
      isMounted && isMounted(false);
    };
  }, [mdStr, title]);

  //其他逻辑
  //转换md格式的数据为html
  //console.log(mdStr);
  const converter = new showdown.Converter({
    extensions: [showdownHighlight]
  });
  const htmlStr = converter.makeHtml(mdStr);
  const createHtml = (htmlStr: string) => {
    return {
      __html: htmlStr
    };
  };

  return (
    <div className="p-8 md:p-[32px] md:rounded pb-[40px] bg-white articleHtml">
      <h1 className="font-black text-4xl mb-[20px]">{title}</h1>
      <div dangerouslySetInnerHTML={createHtml(htmlStr)}></div>
    </div>
  );
});
