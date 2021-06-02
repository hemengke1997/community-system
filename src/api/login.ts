import request from './requestConfig';


/** 登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return request.get('/auth');
}

/** 登录接口 POST /api/login/account */
export async function login(data: any) {
  return request.post('/auth/login', { data });
}
