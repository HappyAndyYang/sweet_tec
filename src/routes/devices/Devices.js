import React, { Component } from 'react';
import { NavBar, PullToRefresh, Icon, Modal, List, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import DeviceList from '../../components/Devices/DeviceList';
import styles from './devices.less';

@connect(
  ({ devices }) => ({ devices })
)
class Devices extends Component {
  componentDidMount() {
    this.queryDevices();
  }
  onSubmit() {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { lable, value } = this.props.form.getFieldsValue();
        dispatch({
          type: 'devices/addDevices',
          payload: { deviceName: lable, deviceIp: value },
        });
      } else {
        alert('添加设备失败，请重试！');
      }
    });
  }

  onClose() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'devices/updateDevice',
      payload: { modalFlag: false },
    });
  }
  queryDevices() {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'devices/getDevices',
      payload: { currentPage: 1, pageSize: 10 },
    });
  }
  addevice = () => {
    const {
      dispatch,
    } = this.props;
    dispatch({
      type: 'devices/updateDevice',
      payload: { modalFlag: true },
    });
  }
  render() {
    const {
      dispatch,
      devices: {
        status,
        data: { list },
        modalFlag,
      },
    } = this.props;
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <NavBar
          className={styles.navbar}
          rightContent={
            <div
              key="1"
              style={{
                background: '#FFCC00',
                fontSize: 14,
                marginRight: 15,
              }}
              onClick={this.addevice}
            >
              添加
            </div>
          }
        >我的设备
        </NavBar>
        <PullToRefresh
          damping={30}
          style={{
            height: document.documentElement.clientHeight,
            overflow: 'auto',
          }}
          indicator={{ deactivate: '上拉可以刷新' }}
          direction="up"
          // onRefresh={this.refresh}
        >
          { status ?
            <Icon type="loading" className={styles.loading} size="lg" />
            : (
              <DeviceList
                dispatch={dispatch}
                devicelist={list}
              />
          )}
        </PullToRefresh>
        <Modal
          visible={modalFlag}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title="添加设备"
          className={styles.modalStyle}
          footer={[
            { text: '取消', onPress: () => { this.onClose(); } },
            { text: '确定', onPress: () => { this.onSubmit(); } },
          ]}
        >
          <List style={{ padding: 0, width: '100%' }}>
            <InputItem
              {...getFieldProps('lable')}
              clear
              placeholder="设备名称"
            >
                设备名称
            </InputItem>
            <InputItem
              {...getFieldProps('value')}
              clear
              placeholder="IP地址"
            >
                IP地址
            </InputItem>
          </List>
        </Modal>
        );
      </div>
    );
  }
}

const DevicesBasic = createForm()(Devices);
export default DevicesBasic;
