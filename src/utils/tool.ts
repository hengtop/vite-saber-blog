// 去重函数

export const uniqueArr = (arr: any[], key = 'id') =>
  arr.filter((item, index: number) => arr.findIndex((iten) => iten[key] === item[key]) === index);
