import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const LButton = sequelize.import('../models/lbutton');
// const log = getLogger('dao/orderDao');

async function findDeviceByIP(deviceIp) {
  const result = await Device.findAll({
    where: { deviceIp },
    attributes: ['deviceId'],
    raw: true,
    logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
  });
  return result;
}

async function delLButtonByDevideId(deviceId) {
  const result = await LButton.destroy({
    where: { deviceId },
    logging: sql => console.log('[delLButtonByDevideId Sql] - ', sql),
  });
  return result;
}

async function delLButtonById(id) {
  const result = await LButton.destroy({
    where: { id },
    logging: sql => console.log('[delLButtonById Sql] - ', sql),
  });
  return result;
}

async function findDeviceLButton(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  const lbtnlist = [];
  if (device.length > 0) {
    const result = await LButton.findAll({
      where: { deviceId: device[0].deviceId },
      attributes: ['id', 'text', 'value', 'x', 'y'],
      raw: true,
      logging: sql => console.log('[findDeviceLButton Sql] - ', sql),
    });
    buttons.push(...result);
  }
  buttons.map(item => {
    const tmp = {};
    tmp.id = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    const { x, y } = item;
    tmp.deltaPosition = { x: Number(x), y: Number(y) };
    lbtnlist.push(tmp);
  });
  return lbtnlist;
}

async function insertLButton(params) {
  const {
    lbutton,
    deviceIp,
  } = params;
  const device = await findDeviceByIP(deviceIp);
  await delLButtonByDevideId(device[0].deviceId);
  const list = [];
  lbutton.map(item => {
    const tmp = {};
    tmp.lbuttonId = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    tmp.deviceId = device[0].deviceId;
    tmp.x = item.deltaPosition.x;
    tmp.y = item.deltaPosition.y;
    list.push(tmp);
  });
  if (device.length > 0) {
    await LButton.bulkCreate(list);
    return 0;
  }
  return 1;
}

export default{
  findDeviceLButton, insertLButton, delLButtonById,
};
