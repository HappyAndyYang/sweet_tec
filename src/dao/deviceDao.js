import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
// const log = getLogger('dao/orderDao');

async function findAllDevices() {
  const result = await Device.findAll({
    attributes: ['deviceId', 'deviceName', 'deviceIp'],
    raw: true,
    logging: sql => console.log('[findAllDevice Sql] - ', sql),
  });
  return result;
}

async function findDeviceByIP(deviceIp) {
  const result = await Device.findAll({
    where: { deviceIp },
    attributes: ['deviceId'],
    raw: true,
    logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
  });
  return result;
}

async function insertDevice(params) {
  const {
    deviceName,
    deviceIp,
  } = params;
  const result = await findDeviceByIP(deviceIp);
  if (result.length > 0) {
    console.log('此设备Ip已存在');
    return 0;
  }
  const sql = `INSERT INTO nodeweb.device (deviceName, deviceIp) VALUES ('${deviceName}','${deviceIp}')`;
  await sequelize.query(sql);
  return 0;
}

async function dealDevices() {
  const devices = await findAllDevices();
  return devices;
}

export default{
  dealDevices, insertDevice,
};
