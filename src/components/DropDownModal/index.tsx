/*
 * @Date: 2022-01-27 22:40:21
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 13:52:48
 */
import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';

import Modal, { ModalPropsType } from '../Modal';

type SM = string | number;

interface ValueDataType {
  title: SM;
  value: SM;
}

interface DropDownModalPropsType extends ModalPropsType {
  className?: any;
  valueField?: ValueDataType;
  valueData?: ValueDataType[];
  handleChange: (e: any, key: SM) => void;
}

export default memo(function index(props: PropsWithChildren<DropDownModalPropsType>) {
  //props/state
  //redux hooks

  //other hooks

  //其他逻辑
  //设置默认值
  const { valueField = { value: 'value', title: 'title' }, valueData = [], handleChange } = props;
  return (
    <Modal {...props}>
      <ul className="py-[10px]">
        {valueData.map((item: any) => {
          return (
            <li
              key={item[valueField.value] ?? item.value}
              className="hover:bg-[hsla(0,0%,94.9%,.5)] px-[18px] cursor-pointer"
              onClick={(e) => handleChange(e, item[valueField.value] ?? item.value)}
            >
              {item[valueField.title] ?? item.title}
            </li>
          );
        })}
      </ul>
    </Modal>
  );
});
