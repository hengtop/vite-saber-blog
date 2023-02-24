/*
 * @Date: 2022-02-02 21:11:14
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-02-25 01:14:34
 */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/zh-cn';

// 加载插件
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('zh-cn');
//时间相关转换函数

//时间展示格式转换
export const formatTime = (time: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);
};

export const showTimeNow = (time: any) => {
  dayjs.extend(relativeTime);
  return dayjs(time).utc().local().fromNow();
};
