import { stringify } from 'qs';
import request from '../utils/request';

export async function order(params) {
  return request('/order', {
    method: 'POST',
    body: params,
  });
}

export async function getdevices(params) {
  return request(`/person/api/getdevices?${stringify(params)}`);
}

export async function adddevices(params) {
  return request('/person/api/adddevices', {
    method: 'POST',
    body: params,
  });
}

export async function getdeviceDetail(params) {
  return request(`/person/api/getdeviceDetail?${stringify(params)}`);
}

export async function savedeviceDetail(params) {
  return request('/person/api/savedeviceDetail', {
    method: 'POST',
    body: params,
  });
}

// export async function getBindTerminal(params) {
//   return request(`/api/v1/syt/bindTerminal/${params.openid}`);
// }
