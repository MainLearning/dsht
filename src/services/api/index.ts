import request from '@/utils/request';

// 登录接口
export const login = (data: API.Login) =>
  request({
    url: 'login',
    method: 'POST',
    data,
  });

// 用户数据列表
export const getUserList = (data: object) =>
  request({
    url: 'users',
    method: 'GET',
    params: data,
  });

// 添加用户
export const addUser = (data: API.AddUser) =>
  request({
    url: 'users',
    method: 'POST',
    data,
  });

// 删除用户
export const deleteUser = (id: number) =>
  request({
    url: `users/${id}`,
    method: 'DELETE',
  });

// 获取商品分类数据列表
export const categoriesList = (data: API.CategoriesList) =>
  request({
    url: 'categories',
    method: 'GET',
    params: data,
  });
