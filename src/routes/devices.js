/**
 *add by yangxf 2018-08-07
 * */
import { Router } from 'express';
import url from 'url';
import deviceDao from '../dao/deviceDao';
import buttonDao from '../dao/buttonDao';
import lbuttonDao from '../dao/lbuttonDao';
import videoDao from '../dao/videoDao';
import checkboxDao from '../dao/checkboxDao';
import socketClient from '../utils/socketClient';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { currentPage, pageSize } = reqData;
    const data = {};
    const response = {};
    const result = await deviceDao.dealDevices();
    response.status = 0;
    response.message = '获取设备列表成功';
    data.list = result;
    data.currentPage = currentPage;
    data.pageSize = pageSize;
    response.data = data;
    res.json(response);
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
      port,
    } = req.body;
    const param = {
      deviceName,
      deviceIp,
      port,
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

router.post('/deleteDevice', async (req, res) => {
  try {
    const data = {};
    const response = {};
    const result = await deviceDao.deleteDevice(req.body);
    response.status = 0;
    response.message = '获取设备列表成功';
    data.list = result;
    data.currentPage = 1;
    data.pageSize = 10;
    response.data = data;
    res.json(response);
  } catch (error) {
    const data = {
      status: 1,
      message: error,
      data: {},
    };
    res.json(data);
  }
});

router.get('/detail', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { deviceIp } = reqData;
    const result = {};
    const resData = {};
    const result1 = await buttonDao.findDeviceButton(deviceIp);
    const result2 = await lbuttonDao.findDeviceLButton(deviceIp);
    const result3 = await checkboxDao.findDeviceCheckbox(deviceIp);
    const result4 = await videoDao.findDeviceVideo(deviceIp);
    result.button = result1;
    result.lbutton = result2;
    result.checkbox = result3;
    result.video = result4;
    resData.data = result;
    resData.status = 0;
    resData.message = '获取设备详情成功';
    res.json(resData);
  } catch (error) {
    const data = {
      status: 1,
      message: error,
      data: {},
    };
    res.json(data);
  }
});

router.post('/detail', async (req, res) => {
  try {
    const data = {};
    const {
      deviceIp,
      control: {
        data: {
          button,
          lbutton,
          checkbox,
          video,
        },
      },
    } = req.body;
    const result1 = await buttonDao.insertButton({ button, deviceIp });
    const result2 = await lbuttonDao.insertLButton({ lbutton, deviceIp });
    const result3 = await videoDao.insertVideo({ video, deviceIp });
    const result4 = await checkboxDao.insertCheckbox({ checkbox, deviceIp });
    if (result1 === 1 || result2 === 1 || result3 === 1 || result4 === 1) {
      data.message = '设备不存在';
      data.status = 1;
    } else {
      data.message = '添加组件成功';
      data.status = 0;
    }
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

router.post('/sendcmd', async (req, res) => {
  try {
    const data = {};
    const {
      deviceIp,
      value,
      port,
    } = req.body;
    console.log(deviceIp, port, value);
    socketClient(true, deviceIp, port, value);
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
