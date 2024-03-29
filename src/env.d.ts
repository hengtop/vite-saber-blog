/// <reference types="vite/client" />

declare module 'lodash-es';

import { compose } from 'redux';

interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly VITE_MOCK: boolean;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/* issue 解决__REDUX_DEVTOOLS_EXTENSION_COMPOSE__属性类型报错问题 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  interface UserInfo {
    id: number;
    name: string;
    email: string;
    birthday: string | Date;
    realname: string;
    cellphone: string;
    avatar_url: string;
  }
}
