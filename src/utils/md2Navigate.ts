/*
 * @Date: 2022-03-10 22:25:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-10 22:52:03
 */
//从md转化成的html中提取h标签,并返回a标签

function md2Navigate(htmlStr: string) {
  if (htmlStr) {
    //匹配h标签
    const reg = /<(h[1-6]).+>[^(<|>)]*<\/\1>/g;
    //匹配h标签内容和id
    const regId = /<(?<html>h[1-6]).+id="(?<id>[^"].*)".*>(?<title>.*)</;
    let navigateDom = '';
    htmlStr.match(reg)?.forEach((item) => {
      const matchRes = item.match(regId);
      if (matchRes) {
        const { html, id, title } = matchRes.groups as { html: string; id: string; title: string };
        navigateDom += `<a href="#${id}" class="a-${html}">${title}</a>`;
      }
    });
    return navigateDom;
  }
}

export default md2Navigate;
