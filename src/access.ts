/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { getUserInfo } from './utils';

export default function access() {
  const userInfo = getUserInfo();
  return {
    canAdmin: userInfo && userInfo.roleName === 'admin',
    canUser: userInfo && userInfo.roleName === 'user',
    canVisitor: userInfo && userInfo.roleName === '',
  };
}
