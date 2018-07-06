/**
 *add by yangxf 2018-04-23*
 * */
import moment from 'moment';
import { Router } from 'express';
import orderDao from '../dao/orderDao';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const data = {};
    const {
      mobile,
      orderDate,
      name,
      myaddress,
    } = req.body;
    const param = {
      mobile,
      date: moment(orderDate).format('YYYY-MM-DD'),
      name,
      myaddress,
    };
    const result = await orderDao.dealOrder(param);
    data.status = 0;
    data.message = '预约成功';
    data.data = result;
    res.json(data);
  } catch (e) {
    const data = {
      status: 1,
      message: e,
      data: {},
    };
    res.json(data);
  }
});

module.exports = router;
