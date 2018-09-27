import React, { Component } from 'react';
import { List, Flex, Icon } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './devices.less';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
class DeviceList extends Component {
  detail = deviceId => () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/deviceDetail/${deviceId}`));
    // console.log(deviceIp);
  }
  deleteDecice = (deviceId) => {
    const { dispatch } = this.props;
    const { userId } = JSON.parse(localStorage.login);
    dispatch({
      type: 'devices/delectDevice',
      payload: { deviceId, userId },
    });
  }
  render() {
    const { devicelist } = this.props;
    if (devicelist && devicelist.length > 0) {
      return (
        <List>
          {
            devicelist.map(item => (
              <ListItem
                key={item.deviceId}
                className={styles.itemextra}
                extra={
                  <Icon
                    type="cross-circle"
                    style={{ width: 15, color: 'red' }}
                    onClick={() => this.deleteDecice(item.deviceId)}
                  />}
              >
                <Flex onClick={this.detail(item.deviceId)}>
                  <Flex.Item>
                    <div style={{ paddingLeft: 15 }}>{item.deviceName}</div>
                  </Flex.Item>
                  <Flex.Item>
                    <ListBrief>
                      {item.deviceIp}
                    </ListBrief>
                  </Flex.Item>
                  <Flex.Item>
                    <ListBrief>
                      {item.port}
                    </ListBrief>
                  </Flex.Item>
                </Flex>
              </ListItem>
            ))
          }
        </List>
      );
    } else {
      return (
        <div className={styles.nolist}>您暂时没有可用的设备</div>
      );
    }
  }
}

export default DeviceList;
