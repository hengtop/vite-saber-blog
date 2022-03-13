/*
 * @Date: 2022-03-10 22:15:51
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-13 17:54:29
 */

//将html转义
// 将HTML特殊字符转换成等值的实体
function escapeHTML(str: string) {
  const escapeChars = {
    '¢': 'cent',
    '£': 'pound',
    '¥': 'yen',
    '€': 'euro',
    '©': 'copy',
    '®': 'reg',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    "'": '#39'
  };
  return str.replace(/[<>]/g, function (match) {
    return '&' + escapeChars[match] + ';';
  });
}

export default escapeHTML;
