import React, { Component } from 'react';
// import { connect } from 'dva';
import { NavBar, Button, InputItem, List, DatePicker, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import { connect } from 'dva';
import styles from './order.less';
import { address } from '../../../mock/api';

const ListItem = List.Item;


@connect(({ order }) => ({ order }))
class Order extends Component {
  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { dp, mobile, myaddress, name } = this.props.form.getFieldsValue();
        const orderDate = moment(dp).format('YYYY-MM-DD hh:mm:ss');
        dispatch({
          type: 'order/order',
          payload: { orderDate, mobile, myaddress: myaddress[0], name },
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
            <InputItem
              {...getFieldProps('name')}
              clear
              type="text"
              placeholder="姓名"
            >
              姓&nbsp;&nbsp;&nbsp;&nbsp;名
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
            <Picker data={address} cols={1} {...getFieldProps('myaddress')}>
              <ListItem arrow="horizontal">领取地址</ListItem>
            </Picker>
          </List>
        </form>
        <Button type="default" onClick={this.onSubmit} className={styles.button}>提交</Button>
        <div className={styles.describe} style={{ marginTop: 30 }}>
        为保证西瓜新鲜，每天限量采摘，凭预约通知前往既定地址领取。(每个手机号只能申领一次)
        </div>
        <div className={styles.describe}>
        领取地点
        </div>
        <div className={styles.describe}>
        1.前往点甜机器人智慧农场领取（地址：亭林镇松前路4180号），也可到瓜田亲自采摘，享受田园乐趣；
        </div>
        <div className={styles.describe}>
        2.前往“绍文雅兹”店铺领取（地址：金山区前京大道277号 ）
        </div>
      </div>
    );
  }
}
const OrderBasic = createForm()(Order);
export default OrderBasic;
