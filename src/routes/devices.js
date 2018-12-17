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
import userDao from '../dao/userDao';
import { sender } from '../utils/rabbitmqSend';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { currentPage, pageSize, userId } = reqData;
    const data = {};
    const response = {};
    const result = await deviceDao.dealDevices(userId);
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
      userId,
    } = req.body;
    const param = {
      deviceName,
      deviceIp,
      port,
      userId,
    };
    await deviceDao.insertDevice(param);
    // data.status = result;
    // data.message = '添加设备成功';
    // data.data = {};
    // res.json(data);
    const response = {};
    const result = await deviceDao.dealDevices(userId);
    response.status = 0;
    response.message = '添加设备成功';
    data.list = result;
    response.data = data;
    res.json(response);
  } catch (e) {
    const data = {
      status: 1,
      message: e,
      data: {},
    };
    res.json(data);
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = {};
    const {
      username,
      password,
    } = req.body;
    const result = await userDao.isUserExist(username, password);
    console.log(result);
    if (result.length > 0) {
      data.status = 0;
      data.message = '登录成功';
      data.userId = result[0].id;
      data.data = {};
      res.json(data);
    } else {
      data.status = 1;
      data.message = '用户名密码不对，请检查输入';
      data.data = {};
      res.json(data);
    }
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
    const { userId } = req.body;
    await deviceDao.deleteDevice(req.body);
    // response.status = 0;
    // response.message = '获取设备列表成功';
    // data.list = result;
    // data.currentPage = 1;
    // data.pageSize = 10;
    // response.data = data;
    // res.json(response);
    const result = await deviceDao.dealDevices(userId);
    response.status = 0;
    response.message = '删除设备成功';
    data.list = result;
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

router.post('/deleteCompent', async (req, res) => {
  try {
    const { type, id, deviceId } = req.body;
    switch (type) {
      case 'button':
        await buttonDao.delButtonById(id);
        break;
      case 'lbutton':
        await lbuttonDao.delLButtonById(id);
        break;
      case 'video':
        await videoDao.delVideoById(id);
        break;
      case 'checkbox':
        await checkboxDao.delCheckboxById(id);
        break;
      default:
        break;
    }
    const result = {};
    const resData = {};
    const result1 = await buttonDao.findDeviceButton(deviceId);
    const result2 = await lbuttonDao.findDeviceLButton(deviceId);
    const result3 = await checkboxDao.findDeviceCheckbox(deviceId);
    const result4 = await videoDao.findDeviceVideo(deviceId);
    result.button = result1;
    result.lbutton = result2;
    result.checkbox = result3;
    result.video = result4;
    resData.data = result;
    resData.status = 0;
    resData.message = '删除组件成功';
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

router.get('/detail', async (req, res) => {
  try {
    const reqData = url.parse(req.url, true).query;
    const { deviceId } = reqData;
    const result = {};
    const resData = {};
    const result1 = await buttonDao.findDeviceButton(deviceId);
    const result2 = await lbuttonDao.findDeviceLButton(deviceId);
    const result3 = await checkboxDao.findDeviceCheckbox(deviceId);
    const result4 = await videoDao.findDeviceVideo(deviceId);
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
      deviceId,
      control: {
        data: {
          button,
          lbutton,
          checkbox,
          video,
        },
      },
    } = req.body;
    const result1 = await buttonDao.insertButton({ button, deviceId });
    const result2 = await lbuttonDao.insertLButton({ lbutton, deviceId });
    const result3 = await videoDao.insertVideo({ video, deviceId });
    const result4 = await checkboxDao.insertCheckbox({ checkbox, deviceId });
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
    const cmd = `*ID${deviceIp}:${value}#`;
    // socketClient(true, deviceIp, port, value);
    socketClient(true, '114.116.39.97', 2000, cmd);
    // sender(`ID${deviceIp}:${value}`);
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

router.get('/test', async () => {
  sender();
});

module.exports = router;
