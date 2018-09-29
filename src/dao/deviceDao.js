import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const Button = sequelize.import('../models/button');
const LButton = sequelize.import('../models/lbutton');
const Checkbox = sequelize.import('../models/checkbox');
const Video = sequelize.import('../models/video');

// const log = getLogger('dao/orderDao');

async function findAllDevices(userId) {
  const result = await Device.findAll({
    attributes: ['deviceId', 'deviceName', 'deviceIp', 'port'],
    where: { userId },
    raw: true,
    logging: sql => console.log('[findAllDevice Sql] - ', sql),
  });
  return result;
}

async function findDeviceByIP(deviceIp, userId) {
  const result = await Device.findAll({
    where: { deviceIp, userId },
    attributes: ['deviceId'],
    raw: true,
    logging: sql => console.log('[findDeviceByIP Sql] - ', sql),
  });
  return result;
}

async function insertDevice(params) {
  const {
    deviceIp,
    deviceName,
    port,
    userId,
  } = params;
  const result = await findDeviceByIP(deviceIp, userId);
  if (result.length > 0) {
    console.log('此设备已存在');
    return 0;
  }
  const tmp = {
    deviceIp, deviceName, port, userId,
  };
  const list = [tmp];
  await Device.bulkCreate(list);
  return 0;
}

async function deleteDevice(params) {
  const { deviceId } = params;
  // const delDevice = await findDeviceByIP(deviceId);
  // console.log(delDevice);
  // const { deviceId } = delDevice[0];
  await Device.destroy({
    where: { deviceId },
    logging: sql => console.log('[deleteDevice Sql] - ', sql),
  });
  await Button.destroy({
    where: { deviceId },
  });
  await LButton.destroy({
    where: { deviceId },
  });
  await Checkbox.destroy({
    where: { deviceId },
  });
  await Video.destroy({
    where: { deviceId },
  });
  // const devices = await findAllDevices();
  // return devices;
  return true;
}

async function dealDevices(userId) {
  const devices = await findAllDevices(userId);
  return devices;
}

export default{
  dealDevices, insertDevice, deleteDevice,
};
