import { history } from 'umi';

type AccssType = 'user' | 'admin';
// 根据用户权限判断去往哪个首页
function goIndex(access: AccssType) {
  if (access === 'user') {
    history.push('/user');
  } else if (access === 'admin') {
    history.push('/admin');
  }
}

// 获取token
function getToken() {
  const token = localStorage.getItem('CS-token');
  return token ? `Bearer ${JSON.parse(token)}` : '';
}

// 获取用户信息
function getUserInfo() {
  return JSON.parse(localStorage.getItem('CS-userInfo') || '{}');
}

export { getToken, getUserInfo, goIndex };
