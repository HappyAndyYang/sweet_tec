import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const Button = sequelize.import('../models/button');
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

async function findDeviceButton(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  if (device.length > 0) {
    const result = await Button.findAll({
      where: { deviceId: device[0].deviceId },
      attributes: ['buttonId', 'text', 'value', 'x', 'y'],
      raw: true,
      logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
    });
    buttons.push(...result);
    return buttons;
  }
  return buttons;
}

async function insertButton(params) {
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
    const sql = `INSERT INTO nodeweb.button (buttonId, text, value, x, y, deviceId) VALUES 
      ('${id}', '${text}', '${value}', '${x}', '${y}', '${device[0].deviceId}')`;
    await sequelize.query(sql);
    return 0;
  }
  return 1;
}

export default{
  findDeviceButton, insertButton,
};
