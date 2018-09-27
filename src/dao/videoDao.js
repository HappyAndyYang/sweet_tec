import sequelize from '../utils/sequelize';

const Device = sequelize.import('../models/device');
const Video = sequelize.import('../models/video');
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

async function delVideoByDevideId(deviceId) {
  const result = await Video.destroy({
    where: { deviceId },
    logging: sql => console.log('[delVideoByDevideId Sql] - ', sql),
  });
  return result;
}

async function delVideoByDevideIP(deviceIp) {
  const device = await findDeviceByIP(deviceIp);
  if (device.length > 0) {
    const { deviceId } = device[0];
    await Video.destroy({
      where: { deviceId },
      logging: sql => console.log('[delVideoByDevideId Sql] - ', sql),
    });
  }
}

async function delVideoById(id) {
  const result = await Video.destroy({
    where: { id },
    logging: sql => console.log('[delVideoById Sql] - ', sql),
  });
  return result;
}

async function findDeviceVideo(deviceId) {
  // const device = await findDeviceByIP(deviceIp);
  const buttons = [];
  const videoList = [];
  const result = await Video.findAll({
    where: { deviceId },
    attributes: ['id', 'text', 'value', 'x', 'y'],
    raw: true,
    logging: sql => console.log('[findDeviceVideo Sql] - ', sql),
  });
  buttons.push(...result);
  buttons.map(item => {
    const tmp = {};
    tmp.id = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    const { x, y } = item;
    tmp.deltaPosition = { x: Number(x), y: Number(y) };
    videoList.push(tmp);
  });
  return videoList;
}

async function insertVideo(params) {
  const {
    video,
    deviceId,
  } = params;
  await delVideoByDevideId(deviceId);
  const list = [];
  video.map(item => {
    const tmp = {};
    tmp.videoid = item.id;
    tmp.text = item.text;
    tmp.value = item.value;
    tmp.deviceId = deviceId;
    tmp.x = item.deltaPosition.x;
    tmp.y = item.deltaPosition.y;
    list.push(tmp);
  });
  await Video.bulkCreate(list);
  return 0;
}

export default{
  findDeviceVideo, insertVideo, delVideoByDevideIP, delVideoById,
};
