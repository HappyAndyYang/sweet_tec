import { stringify } from 'qs';
import request from '../utils/request';

export async function order(params) {
  return request('/order', {
    method: 'POST',
    body: params,
  });
}

export async function getdevices(params) {
  return request(`/devices?${stringify(params)}`);
}

export async function addevices(params) {
  return request('/devices', {
    method: 'POST',
    body: params,
  });
}

export async function delDevices(params) {
  return request('/devices/deleteDevice', {
    method: 'POST',
    body: params,
  });
}

export async function getdeviceDetail(params) {
  return request(`/devices/detail?${stringify(params)}`);
}

export async function savedeviceDetail(params) {
  return request('/devices/detail', {
    method: 'POST',
    body: params,
  });
}

export async function sendcmd(params) {
  return request('/devices/sendcmd', {
    method: 'POST',
    body: params,
  });
}
