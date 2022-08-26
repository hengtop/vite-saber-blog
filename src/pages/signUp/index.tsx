/*
 * @Date: 2022-01-23 20:58:44
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-08-26 18:39:37
 */
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction, getUserInfoAction } from '@/store';
import { register, userAddRole, getCaptcha } from '@/network/api/login';
import { toast } from 'react-toastify';
import { queryToObject, objectToQuery } from '@/utils/locationQuery';
import { omit } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';

import Form, { FormPropsType } from '@/components/Form';

export default memo(function index() {
  //props/state
  const [formData, setFormData] = useState({
    name: '',
    realname: '',
    cellphone: '',
    email: '',
    birthday: '',
    password: '',
    rePassword: '',
    captcha: '',
    sid: '',
  });

  const [captcha, setCaptcha] = useState('');
  const [sid] = useState(uuidv4());

  //redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //其他逻辑
  useEffect(() => {
    getCathchaImage(sid);
  }, []);

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
      const requireProps: string[] = ['name', 'password', 'captcha'];
      for (const key in formData) {
        const element: string = formData[key];
        if (!element) {
          //这里先简单判断，逻辑有点不清晰整洁
          if (requireProps.includes(key)) {
            return await toast.error('请填写' + key, {
              hideProgressBar: true,
              autoClose: 500,
              position: 'top-right',
            });
          }
          // 将空的key传入要清除的数组
          emptyProps?.push(key);
        }
      }
      let res: any;
      try {
        res = await register({ ...omit(formData, emptyProps), sid });
      } catch (error) {
        console.log(error);
        getCathchaImage(sid);
        return;
      }
      await toast.success('注册成功', {
        hideProgressBar: true,
        autoClose: 800,
        position: 'top-right',
        onClose: async () => {
          //成功后登录
          await dispatch(loginAction({ name: formData.name, password: formData.password }));
          //执行页面跳转
          const queryObj = queryToObject();
          const otherQuery = objectToQuery(omit(queryObj, 'redirect'));
          navigate(queryObj['redirect'] + otherQuery);
          //添加角色
          await userAddRole(res.data.id, [20]);
          //再次更新角色信息，之后将这个步骤放置到后端逻辑实现
          dispatch(getUserInfoAction(res.data.id));
        },
      });
    } else {
      await toast.error('两次密码不一样', {
        hideProgressBar: true,
        autoClose: 500,
        position: 'top-right',
      });
    }
  };

  function checkPassword(a: any, b: any) {
    return a === b;
  }

  const getCathchaImage = async (sid: string) => {
    const res = await getCaptcha({ sid });
    const blob = new Blob([res], {
      type: 'image/svg+xml',
    });
    const fileURL = URL.createObjectURL(blob);
    setCaptcha(fileURL);
  };
  /* 记录一个issue这里的样式在刚进入页面的时候不会生效，但是刷星后才会生效 */
  // 表单配置
  const formConfig: FormPropsType<keyof typeof formData> = [
    {
      field: 'name',
      name: '用户名',
      placeholder: 'Username',
      type: 'text',
      onChange: handleChangeFromData,
      required: true,
    },
    {
      field: 'password',
      name: '密码',
      type: 'password',
      placeholder: 'Password',
      required: true,
      onChange: handleChangeFromData,
    },
    {
      field: 'rePassword',
      name: '确认密码',
      placeholder: 'Confirm password',
      type: 'password',
      required: true,
      onChange: handleChangeFromData,
    },
    {
      field: 'realname',
      name: '真实名称',
      placeholder: 'RealName',
      type: 'text',
      onChange: handleChangeFromData,
    },
    {
      field: 'cellphone',
      name: '电话号码',
      placeholder: 'Telephone ',
      type: 'tel',
      onChange: handleChangeFromData,
    },
    {
      field: 'email',
      name: '邮箱',
      type: 'email',
      placeholder: 'Email',
      onChange: handleChangeFromData,
    },
    // 生日控件有点兼容问题暂时不展示了，毕竟不是必穿字段
    // {
    //   field: 'birthday',
    //   name: '生日',
    //   placeholder: 'Birthday',
    //   type: 'date',
    //   onChange: handleChangeFromData,
    // },

    {
      field: 'captcha',
      name: '验证码',
      type: 'text',
      placeholder: 'Captcha',
      onChange: handleChangeFromData,
      required: true,
      captchaImg: (props: any) => (
        <img
          className="w-[120px] bg-[white]"
          onClick={() => getCathchaImage(sid)}
          src={captcha}
          {...props}
        />
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen bg-[url(https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/5848e4a37f5e4fb39f4c4384a9c27523.jpg)] bg-cover bg-no-repeat rounded">
      <div className="flex justify-between rounded-[2px] w-[auto]  md:w-[768px] bg-[white]">
        <div className="hidden md:block md:w-[340px] bg-[url(https://zhanghengtuchaung.oss-cn-chengdu.aliyuncs.com/img/c3b71346ca9d619960eb8537a8eb4e75740ff6fb_raw.jpg)] bg-cover"></div>
        <div className="flex flex-col items-center md:items-[unset] md:w-[auto] ml-[60px] mr-[57.5px]">
          <h2 className="text-2xl text-center my-2">注册用户</h2>
          <Form formConfig={formConfig} />
          <button
            className="mb-2 block w-[80px] py-[3px] px-[5px] mx-auto mt-[20px] tracking-widest rounded border border-[1px] border-solid border-[#333] hover:bg-[#f2f3f4]"
            onClick={handleSubmit}
          >
            注册
          </button>
        </div>
      </div>
    </div>
  );
});
