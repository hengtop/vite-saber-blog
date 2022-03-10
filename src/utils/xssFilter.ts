/*
 * @Date: 2022-03-10 22:15:51
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-10 22:21:01
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
  return str.replace(
    new RegExp('[' + Object.keys(escapeChars).join('') + ']', 'g'),
    function (match) {
      return '&' + escapeChars[match] + ';';
    }
  );
}

export default escapeHTML;
