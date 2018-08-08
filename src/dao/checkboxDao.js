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

async function findDeviceCheckbox(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  if (device.length > 0) {
    const result = await Checkbox.findAll({
      where: { deviceId: device[0].deviceId },
      attributes: ['checkboxid', 'text', 'value', 'x', 'y'],
      raw: true,
      logging: sql => console.log('[findDeviceCheckbox Sql] - ', sql),
    });
    buttons.push(...result);
    return buttons;
  }
  return buttons;
}

async function insertCheckbox(params) {
  const {
    id,
    text,
    value,
    x,
    y,
    deviceIp,
  } = params;
  const device = await findDeviceByIP(deviceIp);
  if (device.length > 0) {
    const sql = `INSERT INTO nodeweb.checkbox (checkboxid, text, value, x, y, deviceId) VALUES 
      ('${id}', '${text}', '${value}', '${x}', '${y}', '${device[0].deviceId}')`;
    await sequelize.query(sql);
    return 0;
  }
  return 1;
}

export default{
  findDeviceCheckbox, insertCheckbox,
};
