import request from '../utils/request';

export async function order(params) {
  return request('/order', {
    method: 'POST',
    body: params,
  });
}
