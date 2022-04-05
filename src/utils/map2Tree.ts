/*
 * @Date: 2022-04-04 21:32:45
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-05 17:52:34
 */
/**
 * @Date: 2022-04-04 21:37:11
 * @author: zhangheng
 * @description:
 * @param {any[]} arrs 原数组
 * @param {number} id 评论id
 * @param {string} parentKey 父级评论id的字段名默认为parentId
 * @param {string} childrenKey 生成结果的子级数组字段名默认为children
 * @return {any[]} 返回数型数组
 */
export const mapTree = (
  arrs: any[],
  id: number | null,
  parentKey = 'parentId',
  childrenKey = 'children',
): any[] => {
  if (!arrs || arrs.length === 0) {
    return [];
  }
  const arr = [];
  for (const item of arrs) {
    // 这里注意如果传入undefined就转为null进行比较
    if ((item[parentKey] ?? null) === id) {
      arr.unshift(item);
      item[childrenKey] = mapTree(arrs, item.id, parentKey, childrenKey);
    }
  }
  return arr;
};
