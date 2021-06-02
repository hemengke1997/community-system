import request from './requestConfig';

/** 获取当前的用户 GET /api/currentUser */
export async function getCurrentUser() {
  return request.get('/api/currentUser');
}

export async function getComplainList() {
  return request.get('/api/getComplainList');
}

export async function getCost() {
  return request.get('/api/getCost');
}

// 用户注册
export async function register(data: any) {
  return request.post('/user/register', { data });
}

// 居住地址
export function getHouse() {
  return request.get('/house/tree');
}

// 修改用户信息
export async function updateUser(data: any) {
  return request.put('/user/update', { data });
}

// 获取用户信息
export function getUser(params: any) {
  return request.get(`/user/info/${params.id}`);
}

// 获取报修列表
export async function getRepairsList(data: any) {
  return request.post(`/repairDetail/my`, { data });
}

// 我的报修
export async function getMyRepairsList() {
  return request.get('/repairDetail');
}

// 我的费用
export async function getMyCost(data: any) {
  return request.post('/payDetail/my', { data });
}

// 通过报修id更新报修状态
export async function updateStatus(data: any) {
  return request.post(`/repairDetail/updateStatus/${data.id}/${data.status}`);
}

// 单个缴费
export async function pay(params: any) {
  return request.get(`/payDetail/pay/${params.id}`);
}

// 全部缴费
export async function payAll() {
  return request.get(`/payDetail/payAll`);
}

// 投诉报修
export async function complain(data: any) {
  return request.post(`/repairDetail/complain`, { data });
}

// 我的投诉
export async function myComplain() {
  return request.post('/complain/list');
}

// 新增投诉
export async function saveComplain(data: any) {
  return request.post('/complain/save', { data });
}

// 新增维修
export function applyRepairs(data: any) {
  return request.post('/repairDetail/apply', { data });
}

// 用户查看公告
export function myNotice(data: any) {
  return request.post('/notice/my', { data });
}

// 用户确认公告
export function affirmNotice(params: any) {
  return request.get(`/notice/affirm/${params.id}`);
}

// 用户获取设备
export function getPublicList() {
  return request.get('/publicFacility/list');
}
