import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import { devices, controls } from './mock/api';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // GET POST 可省略
  // 'POST /order': (req, res) => {
  //   res.send({
  //     message: 'OK',
  //     status: 0,
  //     data: {
  //       mobile: '13789286780',
  //       date: '2018-06-02',
  //     }
  //   });
  // },
  'POST /order': 'http://localhost:3003',
  'GET /devices': 'http://localhost:3003',
  'POST /devices': 'http://localhost:3003',
  'GET /devices/detail': 'http://localhost:3003',
  'POST /devices/detail': 'http://localhost:3003',
  'POST /devices/sendcmd': 'http://localhost:3003',
  'POST /devices/deleteDevice': 'http://localhost:3003',
  'POST /devices/login': 'http://localhost:3003',
};

export default noProxy ? {} : delay(proxy, 1000);
