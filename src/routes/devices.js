/**
 *add by yangxf 2018-08-07
 * */
import { Router } from 'express';
import url from 'url';
import deviceDao from '../dao/deviceDao';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { currentPage, pageSize } = reqData;
    const data = {};
    const result = await deviceDao.dealDevices();
    data.status = 0;
    data.message = '获取设备列表成功';
    data.data = result;
    data.currentPage = currentPage;
    data.pageSize = pageSize;
    res.json(data);
  } catch (error) {
    const data = {
      status: 1,
      message: error,
      data: {},
      currentPage: 1,
      pageSize: 10,
    };
    res.json(data);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = {};
    const {
      deviceName,
      deviceIp,
    } = req.body;
    const param = {
      deviceName,
      deviceIp,
    };
    const result = await deviceDao.insertDevice(param);
    data.status = result;
    data.message = '添加设备成功';
    data.data = {};
    res.json(data);
  } catch (e) {
    const data = {
      status: 1,
      message: e,
      data: {},
    };
    res.json(data);
  }
});

module.exports = router;
