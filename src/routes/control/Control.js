import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { Button, NavBar } from 'antd-mobile';
import { connect } from 'dva';
import Draggable from 'react-draggable';
import ReactPlayer from 'react-player';
import styles from './control.less';

@connect(
  ({ control, devices }) => ({ control, devices })
)
class Control extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { deviceId },
      },
    } = this.props;
    dispatch({
      type: 'control/getdeviceDetail',
      payload: { deviceId },
    });
  }

  onSelect = (opt) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'control/popoVisibleSave',
      payload: {
        popoVisible: false,
        modalsVisible: true,
        popoSelected: opt.props.value,
      },
    });
  };

  onChange = (id, checkedFlag) => {
    const {
      dispatch,
      match: {
        params: { deviceId },
      },
      control: {
        data: {
          checkbox,
        },
      },
      devices: {
        data: {
          list,
        },
      },
    } = this.props;
    const detailData = checkbox ? checkbox.find(item => item.id === id) : {};
    const deviceData = list ? list.find(item => Number(item.deviceId) === Number(deviceId)) : {};
    if (checkedFlag) {
      const reqParams = {
        deviceIp: deviceData.deviceIp,
        value: detailData.value,
        port: deviceData.port,
      };
      dispatch({
        type: 'control/sendCmd',
        payload: reqParams,
      });
    }
    detailData.checkedFlag = !checkedFlag;
    dispatch({
      type: 'control/popoVisibleSave',
      payload: checkbox,
    });
  }

  handleDrag = (type, id) => (e, ui) => {
    const { dispatch, control: { data } } = this.props;
    const deltaPosition = data[`${type}`];
    const delta = deltaPosition.find(item => item.id === id);
    delta.deltaPosition.x += ui.deltaX;
    delta.deltaPosition.y += ui.deltaY;
    dispatch({
      type: 'control/saveComponents',
      payload: data,
    });
  }

  handlePopoVisibleChange = (visible) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'control/popoVisibleSave',
      payload: { popoVisible: visible },
    });
  };

  edit = () => {
    const {
      dispatch,
      match: {
        params: { deviceId },
      },
    } = this.props;
    dispatch(routerRedux.push(`/deviceDetail/controlEdit/${deviceId}`));
  }

  sendcmd = (id, type) => {
    const {
      dispatch,
      match: {
        params: { deviceId },
      },
      control: {
        data: {
          button,
          lbutton,
        },
      },
      devices: {
        data: {
          list,
        },
      },
    } = this.props;
    switch (type) {
      case 'button':
        {
          const detailData = button ? button.find(item => item.id === id) : {};
          const deviceData = list ?
            list.find(item => Number(item.deviceId) === Number(deviceId)) : {};
          const reqParams = {
            deviceIp: deviceData.deviceIp,
            value: detailData.value,
            port: deviceData.port,
          };
          dispatch({
            type: 'control/sendCmd',
            payload: reqParams,
          });
        }
        break;
      case 'lbutton':
        {
          const detailData = lbutton ? lbutton.find(item => item.id === id) : {};
          const deviceData = list ?
            list.find(item => Number(item.deviceId) === Number(deviceId)) : {};
          const reqParams = {
            deviceIp: deviceData.deviceIp,
            value: detailData.value,
            port: deviceData.port,
          };
          dispatch({
            type: 'control/sendCmd',
            payload: reqParams,
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      control: {
        data: {
          button,
          lbutton,
          checkbox,
          video,
        },
      },
    } = this.props;
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
              onClick={this.edit}
            >
              编辑
            </div>
          }
        >
          我的设备
        </NavBar>
        {
          (button && button.length > 0)
            ? button.map(item => (
              <Draggable
                key={item.id}
                disabled
                defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
                onDrag={this.handleDrag('button', item.id)}
              >
                <span style={{ display: 'inline-block', margin: 5 }}>
                  <Button
                  // key={item.id}
                    className={styles.control_btn}
                    onClick={() => this.sendcmd(item.id, 'button')}
                  >
                    {item.text}
                  </Button>
                </span>
              </Draggable>
            ))
            : null
        }
        {
          (lbutton && lbutton.length > 0)
            ? lbutton.map(item => (
              <Draggable
                key={item.id}
                disabled
                defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
                onDrag={this.handleDrag('lbutton', item.id)}
              >
                <span style={{ display: 'inline-block', margin: 5 }}>
                  <Button
                  // key={item.id}
                    size="small"
                    className={styles.control_lbtn}
                    onClick={() => this.sendcmd(item.id, 'lbutton')}
                  >
                    {item.text}
                  </Button>
                </span>
              </Draggable>
            ))
            : null
        }
        {
          (checkbox && checkbox.length > 0)
          ? checkbox.map(item => (
            <Draggable
              key={item.id}
              disabled
              defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
              onDrag={this.handleDrag('checkbox', item.id)}
            >
              <span style={{ display: 'inline-block', margin: 5 }}>
                <input
                  type="checkbox"
                  value={item.value}
                  onChange={() => this.onChange(item.id, item.checkedFlag)}
                />
                <span style={{ marginLeft: '5px' }}>{item.text}</span>
              </span>
            </Draggable>
          ))
          : null
        }
        {
          (video && video.length > 0)
          ? video.map(item => (
            <Draggable
              key={item.id}
              disabled
              defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
              onDrag={this.handleDrag('video', item.id)}
            >
              <span style={{ display: 'inline-block', margin: 5 }}>
                <ReactPlayer
                  url={item.text}
                  width="100%"
                  height="100%"
                />
              </span>
            </Draggable>
          ))
          : null
        }
      </div>
    );
  }
}

export default Control;
