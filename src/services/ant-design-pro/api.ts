import { request } from 'umi';

export async function login(data: API.Login) {
  return request<any>('login', {
    method: 'post',
    data,
  });
}
