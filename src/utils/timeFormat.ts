/*
 * @Date: 2022-02-02 21:11:14
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-02 22:44:00
 */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
//时间相关转换函数

//时间展示格式转换
export const formatTime = (time: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);
};

export const showTimeNow = (time: any) => {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
};
