/*
 * @Date: 2022-01-23 20:58:44
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-08-20 21:30:22
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
  return (
    <div className="h-screen bg-[white] bg-cover bg-no-repeat">
      <div className="p-[10px] md:w-[70%] w-screen   absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2  ">
        <h2 className="text-2xl text-center mb-10">注册用户</h2>
        <form className="h-[360px] flex flex-col justify-between sm:mx-[10%] md:mx-[20%] lg:mx-[25%] xl:mx-[25%] rounded-md">
          <div className="w-full flex">
            <label
              htmlFor="name"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              用户名:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              className="form-input rounded-md flex-auto  font-sans"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('name')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="realname"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px] "
            >
              真实姓名:
            </label>
            <input
              id="realname"
              type="text"
              className="form-input rounded-md flex-auto font-sans"
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
              className="form-input rounded-md flex-auto font-sans"
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
              className="form-input flex-auto font-sans"
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
              className="form-input rounded-md flex-auto font-sans"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('birthday')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="password"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              密码:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="password"
              type="password"
              className="form-input rounded-md flex-auto font-sans"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('password')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="repassword"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              确认密码:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="repassword"
              type="password"
              className="form-input rounded-md flex-auto font-sans"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('rePassword')}
            />
          </div>
          <div className="w-full flex">
            <label
              htmlFor="name"
              className="inline-block w-[80px] text-right mr-[5px] leading-[42px]"
            >
              验证码:<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="captcha"
              type="text"
              className="form-input rounded-md flex-auto  font-sans"
              style={{ borderRadius: '0.375rem' }}
              onChange={handleChangeFromData('captcha')}
            />
            <img
              className="w-[120px] bg-[white]"
              onClick={() => getCathchaImage(sid)}
              src={captcha}
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
