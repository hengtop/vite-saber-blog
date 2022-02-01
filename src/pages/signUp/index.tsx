/*
 * @Date: 2022-01-23 20:58:44
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-02-02 02:15:33
 */
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAction } from '@/store';
import { register } from '@/network/api/login';
import { queryToObject, objectToQuery } from '@/utils/locationQuery';
import { omit } from 'lodash-es';

export default memo(function index() {
  //props/state
  const [formData, setFormData] = useState({
    name: '',
    realname: '',
    cellphone: '',
    email: '',
    birthday: '',
    password: '',
    rePassword: ''
  });

  //redux hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  //其他逻辑

  const handleChangeFromData = (formItem: string) => {
    return (e: any) => {
      setFormData({ ...formData, [formItem]: e.target.value });
    };
  };

  //提交
  const handleSubmit = async () => {
    //判断密码确认
    if (checkPassword(formData.password, formData.rePassword)) {
      const emptyProps: string[] = ['rePassword'];
      for (const key in formData) {
        const element: string = formData[key];
        if (!element) {
          emptyProps?.push(key);
        }
      }
      await register(omit(formData, emptyProps));
      //成功后登录
      await dispatch(loginAction({ name: formData.name, password: formData.password }));
      //执行页面跳转
      const queryObj = queryToObject();
      const otherQuery = objectToQuery(omit(queryObj, 'redirect'));
      navigate(queryObj['redirect'] + otherQuery);
    }
  };

  function checkPassword(a: any, b: any) {
    return a === b;
  }
  /* 记录一个issue这里的样式在刚进入页面的时候不会生效，但是刷星后才会生效 */
  return (
    <div className="h-screen bg-bg1 bg-cover bg-no-repeat">
      <div className="p-[10px] md:w-[70%] w-screen bg-white border-2 absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-xl opacity-80">
        <h2 className="text-center">注册用户</h2>
        <form className="h-[360px] flex flex-col justify-between sm:mx-[10%] md:mx-[20%] lg:mx-[25%] xl:mx-[25%] rounded-md">
          <div className="w-full flex">
            <label
              htmlFor="name"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              用户名:
            </label>
            <input
              id="name"
              type="text"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('name')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="realname"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              真实姓名:
            </label>
            <input
              id="realname"
              type="text"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('realname')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="telphone"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              电话号码:
            </label>
            <input
              id="telphone"
              type="tel"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('cellphone')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="email"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              电子邮箱:
            </label>
            <input
              id="email"
              type="email"
              className="form-input flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('email')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="birthday"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              生日:
            </label>
            <input
              id="birthday"
              type="datetime-local"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('birthday')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="password"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              密码:
            </label>
            <input
              id="password"
              type="password"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('password')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="repassword"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              确认密码:
            </label>
            <input
              id="repassword"
              type="password"
              className="form-input rounded-md flex-auto"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('rePassword')}
            />
          </div>
        </form>
        <button
          className="block w-[80px] py-[3px] px-[5px] mx-auto mt-[20px] tracking-widest rounded border border-[1px] border-solid border-[#333] hover:bg-[#f2f3f4]"
          onClick={handleSubmit}
        >
          注册
        </button>
      </div>
    </div>
  );
});
