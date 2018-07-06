import moment from 'moment';
// import { getLogger } from 'log4js';
import sequelize from '../utils/sequelize';

const Order = sequelize.import('../models/order');
const DayCount = sequelize.import('../models/dayCount');
// const log = getLogger('dao/orderDao');

async function findByMobile(mobile) {
  const userInfo = await Order.findOne({
    where: { mobile },
    attributes: ['Id', 'mobile', 'date', 'adress'],
    raw: true,
  });
  return userInfo;
}

async function findDayCount(date) {
  const startTime = moment(date).format('YYYY-MM-DD 00:00:00');
  const endTime = moment(date).format('YYYY-MM-DD 23:59:59');
  const condition = {};
  condition.date = {
    $gte: startTime,
    $lte: endTime,
  };
  const result = await DayCount.findAll({
    where: condition,
    attributes: ['id', 'date', 'count'],
    raw: true,
    logging: sql => console.log('[findDayCount Sql] - ', sql),
  });
  return result;
}

async function insetOrder(params) {
  const {
    mobile,
    date,
    name,
    myaddress,
  } = params;
  const userInfo = await findByMobile(mobile);
  if (userInfo) {
    return 0;
  }
  // await Order.create({
  //   mobile,
  //   date: moment(date).format('YYYY-MM-DD'),
  // });
  const sql = `INSERT INTO nodeweb.order (mobile, date, name, adress) VALUES ('${mobile}','${date}', '${name}','${myaddress}')`;
  await sequelize.query(sql);
  return 1;
}

async function countByDate(date) {
  const result = await Order.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('date')), 'count']],
    where: {
      date,
    },
    raw: true,
  });
  return result;
}

async function dealOrder(params) {
  const { mobile, date } = params;
  const resultday = await findDayCount(date);
  let dailayNumber = 50;
  if (resultday && resultday.length > 0) {
    dailayNumber = resultday[0].count;
  }
  console.log(dailayNumber);
  const count = await countByDate(moment(date).format('YYYY-MM-DD 00:00:00'));
  if (count && count.count > dailayNumber) {
    const data = {};
    data.flag = true;
    data.message = '抱歉亲，今日预约已满，请更换预约日期重试！';
    return data;
  }
  const result = await insetOrder(params);
  if (result) {
    const result1 = await findByMobile(mobile);
    const data = {};
    data.mobile = result1.mobile;
    data.date = moment(result1.date).format('YYYY-MM-DD');
    data.address = result1.adress;
    data.message = '恭喜您，预约成功！';
    return data;
  }
  const result1 = await findByMobile(mobile);
  const data = {};
  data.mobile = result1.mobile;
  data.date = moment(result1.date).format('YYYY-MM-DD');
  data.address = result1.adress;
  data.message = '您已成功预约过了，请勿重复预约';
  return data;
}
export default{
  dealOrder,
};
