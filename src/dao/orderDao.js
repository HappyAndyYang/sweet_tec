import moment from 'moment';
import sequelize from '../utils/sequelize';

const Order = sequelize.import('../models/order');

async function findByMobile(mobile) {
  const userInfo = await Order.findOne({
    where: { mobile },
    attributes: ['Id', 'mobile', 'date'],
    raw: true,
  });
  return userInfo;
}

async function insetOrder(params) {
  const { mobile, date } = params;
  const userInfo = await findByMobile(mobile);
  if (userInfo) {
    return 0;
  }
  await Order.create({
    mobile,
    date: moment(date).format('YYYY-MM-DD'),
  });
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
  const count = await countByDate(moment(date).format('YYYY-MM-DD 00:00:00'));
  if (count && count.count > 300) {
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
    data.message = '恭喜您，预约成功！';
    return data;
  }
  const result1 = await findByMobile(mobile);
  const data = {};
  data.mobile = result1.mobile;
  data.date = moment(result1.date).format('YYYY-MM-DD');
  data.message = '您已成功预约过了，请勿重复预约';
  return data;
}
export default{
  dealOrder,
};
