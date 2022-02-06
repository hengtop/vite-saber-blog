import React, { memo } from 'react';
import { marked } from 'marked';
import type { PropsWithChildren } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';

interface MdToHtmlPropsType {
  mdStr: string;
  title: string;
}

export default memo(function index(props: PropsWithChildren<MdToHtmlPropsType>) {
  //props/state
  const { mdStr, title } = props;
  //redux hooks

  //other hooks

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
    <div className="p-[32px] pb-[40px] bg-white">
      <h2 className="font-black text-4xl mb-[20px]">{title}</h2>
      <div dangerouslySetInnerHTML={createHtml(htmlStr)}></div>
    </div>
  );
});
