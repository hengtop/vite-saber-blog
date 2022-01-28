/*
 * @Date: 2022-01-23 21:09:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-29 01:01:49
 */
import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import localStore from '@/utils/localStore';
import type { AppState } from '@/store/reducer';

import Input from '../Input';
import ProtalsDom from '../Protals-Dom';
import DropDownModal from '../Drop-Down-Modal';
import CenterModal from '../Center-Modal';

export default function index() {
  const [hidden, setHidden] = useState(true);
  const dropMenuData = [
    { title: '撰写文章', value: 1 },
    { title: '个人中心', value: 2 },
    { title: '退出', value: 3 }
  ];
  //redux hook
  const { userInfo } = useSelector(
    (state: AppState) => ({
      userInfo: state.getIn(['main', 'userInfo'])
    }),
    shallowEqual
  );
  //其他逻辑
  const handleClickHidden = () => {
    setHidden(!hidden);
  };
  //获取点击的item key
  const handleChange = (e: any, key: number | string) => {
    //issue 这里可以阻止冒泡，因为再protals中的事件都会被父元素上所监听的事件捕获
    //e.stopPropagation();
    switch (key) {
      case 1:
        console.log('article');
        break;
      case 2:
        console.log('center');
        break;
      case 3:
        //清空缓存和强制刷新
        localStore.clearLocalStore();
        window.location.reload();
        break;
      default:
        return;
    }
    //关闭弹窗
    handleClickHidden();
  };
  return (
    <div className="fixed left-0 right-0 w-auto h-16 bg-white flex items-center justify-center px-[40px] z-[5]">
      <div className="w-full flex justify-between">
        <h2 className="order-2 md:order-1">heng的博客</h2>
        <Input />
        <div className="md:block order-3" onClick={handleClickHidden}>
          {Reflect.ownKeys(userInfo as any).length === 0 ? (
            <>
              <i className="iconfont icon-yonghu-xianxing text-2xl" onClick={handleClickHidden}></i>
              <ProtalsDom>
                <CenterModal
                  hidden={hidden}
                  maskClassName="bg-[#333] opacity-40"
                  handleClickHidden={handleClickHidden}
                />
              </ProtalsDom>
            </>
          ) : (
            <>
              <img
                className="w-[36px] h-[36px] rounded-full"
                src={(userInfo as any).avatar_url}
                onClick={handleClickHidden}
              />
              <ProtalsDom>
                <DropDownModal
                  className="translate-x-[0] translate-y-[0] left-[unset] right-[10px] top-[68px]  shadow-lg border border-solid border-[rgba(177,180,185,.45)]"
                  valueData={dropMenuData}
                  hidden={hidden}
                  handleChange={handleChange}
                  MaskHidden={true}
                />
              </ProtalsDom>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
