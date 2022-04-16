/*
 * @Date: 2022-01-23 21:09:49
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-16 13:56:31
 */
import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import { getAllArticleAction } from '@/pages/home/store';
import localStore from '@/utils/localStore';
import { changeKeyword } from '@/store';
import { handleClickHiddenEvent } from '@/utils/events';
import { useLogin } from '@/hooks/useLogin';

import Input from '../Input';
import ProtalsDom from '../ProtalsDom';
import DropDownModal from '../DropDownModal';
import CenterModal from '../CenterModal';

import type { AppState } from '@/store/reducer';

export default function index() {
  const [loginHidden, setLoginHidden] = useState(true);
  const [menuHidden, setMenuHidden] = useState(true);
  const dropMenuData = [
    { title: '撰写文章', value: 1 },
    { title: '个人中心', value: 2 },
    { title: '退出', value: 3 },
  ];
  //redux hook
  //这里解构取出的变量会丢失类型。。。
  const { keyword } = useSelector(
    (state: AppState) => ({
      keyword: state.getIn(['main', 'keyword']),
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  //other hooks
  // 获取用户数据和是否登录flag
  const [isLogin, userInfo] = useLogin();

  //获取路由参数
  const location = useLocation();
  const navigate = useNavigate();

  //监听打开登录窗口
  useEffect(() => {
    const widowHidden = () => {
      setLoginHidden(false);
    };
    handleClickHiddenEvent.on('openLoginWindow', widowHidden);
    return () => {
      handleClickHiddenEvent.removeListener('openLoginWindow', widowHidden);
    };
  }, []);
  //其他逻辑,
  const handleClickHidden = () => {
    if (isLogin) {
      setMenuHidden(!menuHidden);
    } else {
      setLoginHidden(!loginHidden);
      // if (!loginHidden === true) {
      //   localStore.setLocalStore('isFirstLogin', false);
      // }
    }
  };
  //获取搜索输入框的值，进行搜索提示
  const handleSearchChange = (value: string) => {
    dispatch(changeKeyword(value));
    //搜索提示相关逻辑
  };
  //回车或者点击搜索框左侧按钮搜索
  const handleSearchClick = (e: any) => {
    if ((e.keyCode === 13 || e.type === 'click') && (keyword as string).trim()) {
      dispatch(getAllArticleAction({ keyword: keyword as string }));
      const searchQuery = createSearchParams({
        query: keyword as string,
      });
      navigate('/?' + searchQuery);
    }
  };
  //获取点击的item key
  const handleChange = (e: any, key: number | string) => {
    //issue 这里可以阻止冒泡，因为再protals中的事件都会被父元素上所监听的事件捕获
    //e.stopPropagation();
    switch (key) {
      case 1:
        window.open('/admin/main/article/article-add' + location.search, '_self');
        break;
      case 2:
        window.open('/admin/main/profile/center' + location.search, '_self');
        break;
      case 3:
        //清空缓存和强制刷新
        localStore.clearLocalStore();
        toast.info('退出成功', {
          hideProgressBar: true,
          autoClose: 200,
          position: 'top-right',
          onClose: () => {
            window.location.reload();
          },
        });

        break;
      default:
        return;
    }
    //关闭弹窗
    handleClickHidden();
  };
  return (
    <div className="fixed top-0 left-0 right-0 w-auto h-16 bg-white flex items-center justify-center px-[40px] z-[5]">
      <div className="w-full flex justify-between items-center">
        <h2
          className="order-2  md:order-1 cursor-pointer text-[1.5em] font-black"
          onClick={() => navigate('/')}
        >
          heng的博客
        </h2>
        <Input handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} />
        <div className="md:block order-3">
          {!isLogin ? (
            <>
              <i className="iconfont icon-yonghu-xianxing text-2xl" onClick={handleClickHidden}></i>
              <ProtalsDom>
                <CenterModal
                  hidden={loginHidden}
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
                  hidden={menuHidden}
                  MaskHidden={false}
                  handleChange={handleChange}
                  handleClickHidden={handleClickHidden}
                />
              </ProtalsDom>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
