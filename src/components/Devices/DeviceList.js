import React, { Component } from 'react';
import { List, Flex } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './devices.less';

const ListItem = List.Item;
const ListBrief = ListItem.Brief;
class DeviceList extends Component {
  detail = deviceIp => () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/deviceDetail/${deviceIp}`));
    // console.log(deviceIp);
  }
  render() {
    const { devicelist } = this.props;
    if (devicelist && devicelist.length > 0) {
      return (
        <List>
          {
            devicelist.map(item => (
              <ListItem key={item.deviceIp}>
                <Flex onClick={this.detail(item.deviceIp)}>
                  <Flex.Item>
                    <div style={{ paddingLeft: 15 }}>{item.deviceName}</div>
                  </Flex.Item>
                  {/* <Flex.Item>{item.deviceIp}</Flex.Item> */}
                  <Flex.Item>
                    <ListBrief>
                      {item.deviceIp}
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
