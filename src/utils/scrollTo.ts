/*
 * @Date: 2022-03-15 22:35:45
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-15 22:35:45
 */
//设置滚动动画
export const scrollTo = (element: HTMLElement, to: number, duration: number) => {
  if (duration <= 0) return;
  //最小间隔时间ms
  const everyTime = 10;
  const difference = to - element.scrollTop; //滚动的距离
  const perTick = (difference / duration) * everyTime; //单位间隔时间移动的距离
  setTimeout(() => {
    element.scrollTop += perTick;
    if (element.scrollTop === to) {
      return;
    } else {
      scrollTo(element, to, duration - everyTime);
    }
  }, everyTime);
};
