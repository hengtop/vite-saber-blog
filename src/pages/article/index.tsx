/*
 * @Date: 2022-01-23 20:11:30
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-23 22:52:49
 */
import React from 'react';
import { useParams } from 'react-router-dom';

export default function index() {
  const params = useParams();
  console.log(params);
  return <div>article:{params.articleId}</div>;
}
