/*
 * @Date: 2022-02-02 02:13:33
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-02 02:13:34
 */

//获取url参数，转为对象
export const queryToObject = () => {
  const res = {};
  const search = location.search;
  const paramArr = new URLSearchParams(search);
  paramArr.forEach((val, key) => {
    res[key] = val;
  });
  return res;
};
//对象转为query
export const objectToQuery = (obj: any) => {
  let query = '?';
  for (const key in obj) {
    query += key + '=' + obj[key] + '&';
  }
  return query.slice(0, query.length - 1);
};
