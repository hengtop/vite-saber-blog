/// <reference types="vite/client" />

declare module 'lodash-es';
declare module 'showdown';

declare module 'events';
import { compose } from 'redux';

interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
  readonly VITE_MOCK: boolean;
  // 更多环境变量...
}

/* issue 解决__REDUX_DEVTOOLS_EXTENSION_COMPOSE__属性类型报错问题 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
