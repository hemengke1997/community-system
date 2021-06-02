import request from './requestConfig';

export async function getUserList(params: any) {
  return request.get(`/user/page/${params.page}/${params.size}`);
}

export async function getRepairsList(params: any) {
  return request.get(`/repairDetail/list/${params.page}/${params.size}`);
}

export function agreePrice(params: any) {
  return request.post(`/repairDetail/agree/${params.id}/${params.price}`);
}

// 通过报修id更新报修状态
export async function updateStatus(data: any) {
  return request.post(`/repairDetail/updateStatus/${data.id}/${data.status}`);
}

// 删除用户
export async function deleteUser(data: any) {
  return request.delete('/user/delete', { data });
}

// 获取单个用户信息
export function getUserInfo(params: any) {
  return request.get(`/user/info/${params.id}`);
}

// 获取费用列表
export async function getPayList(params: any) {
  return request.get(`/payDetail/page/${params.page}/${params.size}`);
}

// 删除费用
export function deletePay(data: any) {
  return request.delete('/payDetail/delete', { data });
}

// 获取公告列表
export async function getNoticeList(params: any) {
  return request.get(`/notice/page/${params.page}/${params.size}`);
}

// 获取单个公告的信息
export async function getNotice(params: any) {
  return request.get(`/notice/info/${params.id}`);
}

// 更新公告
export async function updateNotice(data: any) {
  return request.put(`/notice/update`, { data });
}

// 新增公告
export async function addNotice(data: any) {
  return request.post('/notice/save', { data });
}

// 删除公告
export function deleteNotice(data: any) {
  return request.delete('/notice/delete', { data });
}

// 投诉列表
export async function getComplainList(params: any) {
  return request.get(`/complain/page/${params.page}/${params.size}`);
}

// 删除投诉
export async function deleteComplain(data: any) {
  return request.delete('/complain/delete', { data });
}

// 更改投诉状态
export function updateComplain(params: any) {
  return request.get(`/complain/updateStatus/${params.id}/${params.status}`);
}

// 获取公共设备列表
export async function getPublicList(params: any) {
  return request.get(`/publicFacility/page/${params.page}/${params.size}`);
}

// 修改公共设备
export async function updatePublic(data: any) {
  return request.put('/publicFacility/update', { data });
}

// 删除设备
export async function deletePublic(data: any) {
  return request.delete('/publicFacility/delete', { data });
}

// 新增设备
export async function savePublic(data: any) {
  return request.post('/publicFacility/save', { data });
}

// 获取设备详情
export function getPublic(params: any) {
  return request.get(`/publicFacility/info/${params.id}`)
}
