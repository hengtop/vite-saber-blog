/*
 * @Date: 2021-12-08 16:04:15
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 15:10:04
 */

// 处理async await 的一个函数，
/*   使用了async await 那么久，虽然用起来很简洁，await在错误处理方面还有所欠缺，当然可能会说用
      trycatch 的方法不就行了吗，但大量的trycatch充斥在代码中也是很不好看的，
      这里借鉴了网上的解决方案和自己的理解，写了一个简易的包装函数用于处理await的异常情况
*/

export const awaitHandle = <T, U = any>(promise: Promise<T>): Promise<[T | null, U | null]> => {
  return promise
    .then<[T, null]>((data: T) => {
      return [data, null];
    })
    .catch<[null, U]>((err: U) => {
      //console.error(err);
      return [null, err];
    });
};
