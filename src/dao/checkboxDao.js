import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const Checkbox = sequelize.import('../models/checkbox');
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

async function delCheckboxByDevideId(deviceId) {
  const result = await Checkbox.destroy({
    where: { deviceId },
    logging: sql => console.log('[delCheckboxByDevideId Sql] - ', sql),
  });
  return result;
}

async function delCheckboxByDevideIP(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  if (device.length > 0) {
    const { deviceId } = device[0];
    await Checkbox.destroy({
      where: { deviceId },
      logging: sql => console.log('[delCheckboxByDevideId Sql] - ', sql),
    });
  }
}

async function findDeviceCheckbox(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  const checkboxList = [];
  if (device.length > 0) {
    const result = await Checkbox.findAll({
      where: { deviceId: device[0].deviceId },
      attributes: ['id', 'text', 'value', 'x', 'y', 'checkedFlag'],
      raw: true,
      logging: sql => console.log('[findDeviceCheckbox Sql] - ', sql),
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
    tmp.checkedFlag = item.checkedFlag;
    checkboxList.push(tmp);
  });
  return checkboxList;
}

async function insertCheckbox(params) {
  const {
    checkbox,
    deviceIp,
  } = params;
  const device = await findDeviceByIP(deviceIp);
  await delCheckboxByDevideId(device[0].deviceId);
  const list = [];
  checkbox.map(item => {
    const tmp = {};
    tmp.checkboxid = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    tmp.deviceId = device[0].deviceId;
    tmp.x = item.deltaPosition.x;
    tmp.y = item.deltaPosition.y;
    tmp.checkedFlag = 'true';
    list.push(tmp);
  });
  if (device.length > 0) {
    await Checkbox.bulkCreate(list);
    return 0;
  }
  return 1;
}

export default{
  findDeviceCheckbox, insertCheckbox, delCheckboxByDevideIP,
};
