/*
 * @Date: 2022-01-28 14:40:22
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-08-26 17:43:41
 */
import React, { memo } from 'react';

export interface FormItemPropsType<T> {
  field: T;
  name: string;
  type: string;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange: (filed: string) => (e: any) => void;
  captchaImg?: (props?: any) => JSX.Element;
  required?: boolean;
  showLabel?: boolean;
}

export type FormPropsType<T = string> = FormItemPropsType<T>[];

export default memo(function index({ formConfig = [] }: { formConfig: FormPropsType }) {
  //props/state
  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <form className="flex flex-col justify-between">
      {formConfig.map((item, index) => {
        return (
          <div className="flex relative my-1" key={index}>
            {item.showLabel ? (
              <label
                htmlFor={item.field}
                className={`inline-block w-[80px] text-right mr-[5px] leading-[42px] ${item?.labelClassName}`}
              >
                {item.name}:{item?.required ? <span style={{ color: 'red' }}>*</span> : ''}
              </label>
            ) : (
              ''
            )}
            {item?.required ? <span className="text-[red] absolute">*</span> : ''}
            {item.captchaImg ? (
              <>
                <input
                  id={item.field}
                  type={item.type}
                  placeholder={item.placeholder}
                  style={{ width: 'calc(100% - 120px)' }}
                  className={` sm:w-[180px] leading-[42px] px-[10px]  rounded-md flex-auto  font-sans border-none rounded-[3px] bg-[#f5f4f6]  focus:outline-none placeholder:font-bold ${item?.inputClassName}`}
                  onChange={item.onChange(item.field)}
                />
                {item.captchaImg?.()}
              </>
            ) : (
              <input
                id={item.field}
                type={item.type}
                placeholder={item.placeholder}
                className={`w-[100%] sm:w-[300px] leading-[42px] px-[10px]  rounded-md flex-auto  font-sans border-none rounded-[3px] bg-[#f5f4f6]  focus:outline-none placeholder:font-bold ${item?.inputClassName}`}
                onChange={item.onChange(item.field)}
              />
            )}
          </div>
        );
      })}
    </form>
  );
});
