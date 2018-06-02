import React, { Component } from 'react';
// import { connect } from 'dva';
import { NavBar, List, Icon, Grid } from 'antd-mobile';
import { connect } from 'dva';
import styles from './order.less';

const ListItem = List.Item;


@connect(({ order }) => ({ order }))
class OrderSucess extends Component {
  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/back',
      payload: '',
    });
  };
  render() {
    const {
      order: {
        data: {
          mobile,
          date,
          message,
          flag,
        },
      },
    } = this.props;
    const data = [{
      icon: (<Icon type="check-circle-o" style={{ color: 'green' }} />),
      text: message,
    }];
    const data2 = [{
      icon: (<Icon type="cross-circle" style={{ color: 'red' }} />),
      text: message,
    }];
    return (
      <div>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back} className={styles.navbar}>活动预约</NavBar>
        {
          flag ?
            <Grid data={data2} columnNum={1} hasLine={false} activeStyle={false} />
          : (
            <div>
              <List>
                <ListItem wrap>手机号码：{mobile}</ListItem>
                <ListItem wrap>成功预约时间：{date}</ListItem>
              </List>
              <Grid data={data} columnNum={1} hasLine={false} activeStyle={false} />
            </div>
          )}
      </div>
    );
  }
}
export default OrderSucess;
