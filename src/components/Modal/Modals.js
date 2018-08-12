import React, { Component } from 'react';
import { Modal, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './modals.less';

class Modals extends Component {
  onSubmit = (type) => {
    const {
      dispatch,
      control: {
        data,
        // data: { button },
      },
    } = this.props;
    const tmp = data[`${type}`];
    const id = tmp.length + 1;
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const { lable, value } = this.props.form.getFieldsValue();
        tmp.push({
          text: lable,
          value,
          id,
          deltaPosition: { x: 0, y: 0 },
        });
        dispatch({
          type: 'control/saveComponents',
          payload: data,
        });
        this.onClose();
      } else {
        alert('添加失败');
      }
    });
  };
  onClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'control/popoVisibleSave',
      payload: {
        modalsVisible: false,
      },
    });
  }

  render() {
    const { popoSelected, modalsVisible } = this.props;
    const { getFieldProps } = this.props.form;
    switch (popoSelected) {
      case 'button':
        return (
          <Modal
            visible={modalsVisible}
            transparent
            maskClosable={false}
            onClose={this.onClose}
            title="添加按钮"
            className={styles.modalStyle}
            footer={[
              { text: '取消', onPress: () => { this.onClose(); } },
              { text: '确定', onPress: () => { this.onSubmit('button'); } },
            ]}
          >
            <List style={{ padding: 0, width: '100%' }}>
              <InputItem
                {...getFieldProps('lable')}
                clear
                placeholder="按钮名"
              >
                按钮名
              </InputItem>
              <InputItem
                {...getFieldProps('value')}
                clear
                placeholder="指令"
              >
                指令
              </InputItem>
            </List>
          </Modal>
        );
      case 'lbutton':
        return (
          <Modal
            visible={modalsVisible}
            transparent
            maskClosable={false}
            onClose={this.onClose}
            title="添加按钮"
            className={styles.modalStyle}
            footer={[
            { text: '取消', onPress: () => { this.onClose(); } },
            { text: '确定', onPress: () => { this.onSubmit('lbutton'); } },
          ]}
          >
            <List style={{ padding: 0, width: '100%' }}>
              <InputItem
                {...getFieldProps('lable')}
                clear
                placeholder="按钮名"
              >
                按钮名
              </InputItem>
              <InputItem
                {...getFieldProps('value')}
                clear
                placeholder="指令"
              >
                指令
              </InputItem>
            </List>
          </Modal>
        );
      case 'checkbox':
        return (
          <Modal
            visible={modalsVisible}
            transparent
            maskClosable={false}
            onClose={this.onClose}
            title="添加复选框"
            className={styles.modalStyle}
            footer={[
            { text: '取消', onPress: () => { this.onClose(); } },
            { text: '确定', onPress: () => { this.onSubmit('checkbox'); } },
          ]}
          >
            <List style={{ padding: 0, width: '100%' }}>
              <InputItem
                {...getFieldProps('lable')}
                clear
                placeholder="复选框名"
              >
                复选框名
              </InputItem>
              <InputItem
                {...getFieldProps('value')}
                clear
                placeholder="指令"
              >
                指令
              </InputItem>
            </List>
          </Modal>
        );
      case 'video':
        return (
          <Modal
            visible={modalsVisible}
            transparent
            maskClosable={false}
            onClose={this.onClose}
            title="添加视频组件"
            className={styles.modalStyle}
            footer={[
            { text: '取消', onPress: () => { this.onClose(); } },
            { text: '确定', onPress: () => { this.onSubmit('video'); } },
          ]}
          >
            <List style={{ padding: 0, width: '100%' }}>
              <InputItem
                {...getFieldProps('lable')}
                clear
                placeholder="视频地址"
              >
                视频地址
              </InputItem>
              <InputItem
                {...getFieldProps('value')}
                clear
                placeholder="视频格式"
              >
                视频格式
              </InputItem>
            </List>
          </Modal>
        );
      default:
        return null;
        // break;
    }
  }
}

const ModalsBasic = createForm()(Modals);
export default ModalsBasic;
