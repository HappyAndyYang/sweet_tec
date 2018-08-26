import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const Button = sequelize.import('../models/button');
// const log = getLogger('dao/orderDao');

async function findDeviceByIP(deviceIp) {
  console.log(deviceIp);
  const result = await Device.findAll({
    where: { deviceIp },
    attributes: ['deviceId'],
    raw: true,
    logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
  });
  return result;
}

async function delButtonByDevideId(deviceId) {
  const result = await Button.destroy({
    where: { deviceId },
    logging: sql => console.log('[delButtonByDevideId Sql] - ', sql),
  });
  return result;
}

async function delButtonByDevideIP(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  if (device.length > 0) {
    const { deviceId } = device[0];
    await Button.destroy({
      where: { deviceId },
      logging: sql => console.log('[delButtonByDevideId Sql] - ', sql),
    });
  }
}

async function delButtonById(id) {
  const result = await Button.destroy({
    where: { id },
    logging: sql => console.log('[delButtonById Sql] - ', sql),
  });
  return result;
}

async function findDeviceButton(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  const btnlist = [];
  if (device.length > 0) {
    const result = await Button.findAll({
      where: { deviceId: device[0].deviceId },
      attributes: ['id', 'text', 'value', 'x', 'y'],
      raw: true,
      logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
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
    btnlist.push(tmp);
  });
  return btnlist;
}

async function insertButton(params) {
  const {
    button,
    deviceIp,
  } = params;
  const device = await findDeviceByIP(deviceIp);
  await delButtonByDevideId(device[0].deviceId);
  const list = [];
  button.map(item => {
    const tmp = {};
    tmp.buttonId = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    tmp.deviceId = device[0].deviceId;
    tmp.x = item.deltaPosition.x;
    tmp.y = item.deltaPosition.y;
    list.push(tmp);
  });
  if (device.length > 0) {
    await Button.bulkCreate(list);
    return 0;
  }
  return 1;
}

export default{
  findDeviceButton, insertButton, findDeviceByIP, delButtonByDevideIP, delButtonById,
};
