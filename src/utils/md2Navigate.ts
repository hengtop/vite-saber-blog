/*
 * @Date: 2022-03-10 22:25:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-15 23:04:24
 */
//从md转化成的html中提取h标签,并返回一个对象用于渲染a标签

export interface RenderObjType {
  html: string;
  id: string;
  title: string;
}

function md2Navigate(htmlStr: string) {
  if (htmlStr) {
    //匹配h标签
    const reg = /<(h[1-6])[^<>]+>.*<\/\1>/g;
    //匹配h标签内容和id
    const regId = /<(?<html>h[1-6]).+id="(?<id>[^"].*)">(?<title>.*)<\/\1>/;
    const domRenderObj: RenderObjType[] = [];
    htmlStr.match(reg)?.forEach((item) => {
      const matchRes = item.match(regId);
      if (matchRes) {
        //console.log(matchRes);
        const { title } = matchRes.groups as any;
        //console.log(title);
        //有时候h标签中也嵌套了标签所以这里只提取html中的文本
        const innerText = title.replace(/(<[a-zA-z/]*>)/g, '');
        matchRes.groups!.title = innerText;
        domRenderObj.push(matchRes.groups as any);
      }
    });
    return domRenderObj;
  } else {
    return [];
  }
}

export default md2Navigate;
