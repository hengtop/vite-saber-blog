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
  const htmlStr = converter.makeHtml(
    "# **React 中自定义防抖函数**\n\n**最近在做一个**`React`**的项目，中间做到搜索提示这个功能的时候遇到了请求次数过多的问题，当然对于这种情况肯定需要防抖来是请求延后发送，避免提示框随用户输入切换过于频繁，影响交互体验。**\n\n**首先实现一个经典的防抖函数，这有什么难的嘛：**\n\n```js\nexport const debounce = (fn, delay) => {\n    let time = null;\n    return function(...args) {\n        if(time) {\n            clearTimeout(time);\n        }\n        time = setTimeout(() => {\n            fn.apply(this, args);\n        }, delay)\n    }\n}\n```\n\n**然后在函数组件中使用：**\n\n```js\nuseEffect(() => {\n    getSearchRes();\n  }, [dispatch, keywords]);\n\n  /* 其他逻辑 */\n  //防抖函数处理\n  const getSearchRes = debounce(() =>\n     //请求函数放置在redux中\n    dispatch(getSearchKeywordsResAction(keywords, { offset: 0, limit: 4 }))\n  );\n```\n\n**最后保存测试，发现连续输入并不是在最后一次输入后延时发送请求，而是每次输入都会发送请求，只是每次发送请求延时了而已。这咋没用哇。**\n\n**之后查阅了其他网站后发现了问题，还是自己对**`React hooks`**不熟悉哇，当我们输入时改变**`keywords`**，都会导致函数组件重新刷新执行，所以里面所有的hooks都会重新执行，我定义的普通函数也会重新执行。防抖函数中的**`time`**每次都是定义一个新的，并没有保存到**`time`**的状态，毕竟防抖的关键就是利用闭包保存**`time`**变量。所以要保存**`time`**这个变量使其在整个组件声明周期不变，于是就想到了**`useRef`**这个**`hook`**。**\n\n**解决方式有了，我们可以考虑编写自定义**`hooks`**来实现这个功能:**\n\n```js\nimport { useRef } from 'react';\n\n//防抖函数\nexport const useDebounce = (fn, delay = 200) => {\n  //todo 关于react hooks 中的防抖实现\n  const { current } = useRef({});\n  return function (...args) {\n    if (current.time) {\n      clearTimeout(current.time);\n    }\n    current.time = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n};\n```\n\n**这样就使得防抖函数生效了。**\n\n**通过这个案例其实也是让我知道了React真的能反映一个人JS原生编写能力。哎好好补基础了。**\n\n**参考文章：**\n[一起围观由React Hooks防抖引发的面试翻车现场](https://mp.weixin.qq.com/s/IOHEobiq9v4i8Dvkv1zZ0A)\n"
  );
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
