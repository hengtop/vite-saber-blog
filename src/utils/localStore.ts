/*
 * @Date: 2022-01-28 21:15:22
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-01-28 21:20:01
 */
export class LocalStore {
  getLocalStore(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  setLocalStore(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  removeLocalStore(key: string) {
    window.localStorage.removeItem(key);
  }
  clearLocalStore() {
    window.localStorage.clear();
  }
}

export default new LocalStore();
