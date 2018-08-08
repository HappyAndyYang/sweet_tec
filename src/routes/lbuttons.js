/**
 *add by yangxf 2018-08-08
 * */
import { Router } from 'express';
import url from 'url';
import lbuttonDao from '../dao/lbuttonDao';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { deviceIp, currentPage, pageSize } = reqData;
    const data = {};
    const result = await lbuttonDao.findDeviceLButton(deviceIp);
    data.status = 0;
    data.message = '获取设备lbutton成功';
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
    const result = await lbuttonDao.insertLButton(req.body);
    if (result === 1) {
      data.message = '设备不存在';
    } else {
      data.message = '添加组件成功';
    }
    data.status = result;
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
