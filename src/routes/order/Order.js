import React, { Component } from 'react';
// import { connect } from 'dva';
import { NavBar, Button, InputItem, List, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import { connect } from 'dva';
import styles from './order.less';

const ListItem = List.Item;


@connect(({ order }) => ({ order }))
class Order extends Component {
  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { dp, mobile } = this.props.form.getFieldsValue();
        const orderDate = moment(dp).format('YYYY-MM-DD hh:mm:ss');
        dispatch({
          type: 'order/order',
          payload: { orderDate, mobile },
        });
      } else {
        alert('预约失败，请重试。');
      }
    });
  }
  validateDatePicker = (rule, date, callback) => {
    if (date && date.getMinutes() !== 15) {
      callback();
    } else {
      callback(new Error('15 is invalid'));
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { order: { dpValue, nowTime } } = this.props;
    return (
      <div>
        <NavBar className={styles.navbar}>领取预约</NavBar>
        <form>
          <List>
            <InputItem
              {...getFieldProps('mobile')}
              clear
              type="phone"
              placeholder="手机号码"
            >
              手机号码
            </InputItem>
            <DatePicker
              {...getFieldProps('dp', {
                initialValue: dpValue,
                rules: [
                  { required: true, message: '必须选择一个时间' },
                  { validator: this.validateDatePicker },
                ],
              })}
              mode="date"
              minDate={nowTime}
            >
              <ListItem arrow="horizontal">选择时间</ListItem>
            </DatePicker>
          </List>
        </form>
        <Button type="default" onClick={this.onSubmit} className={styles.button}>提交</Button>
      </div>
    );
  }
}
const OrderBasic = createForm()(Order);
export default OrderBasic;
