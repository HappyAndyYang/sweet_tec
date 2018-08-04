import React, { Component } from 'react';
import { Button, NavBar, Popover /* Checkbox */ } from 'antd-mobile';
import { connect } from 'dva';
import Draggable from 'react-draggable';
import Reflv from 'reflv';
// import ReactPlayer from 'react-player';
import styles from './control.less';
import ModalsBasic from '../../components/Modal/Modals';

@connect(
  ({ control }) => ({ control })
)
class ControlEdit extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { deviceIp },
      },
    } = this.props;
    dispatch({
      type: 'control/getdeviceDetail',
      payload: deviceIp,
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

  onChange = (id) => {
    // console.log(id);
    const { dispatch, control: { checkedFlag } } = this.props;
    console.log(`checkedFlag=${checkedFlag[id]}`);
    if (checkedFlag[id]) {
      console.log('false11');
    } else {
      console.log('true22');
    }
    checkedFlag[id] = !checkedFlag[id];
    dispatch({
      type: 'control/popoVisibleSave',
      payload: { checkedFlag },
    });
  }

  handleDrag = (type, id) => (e, ui) => {
    const { dispatch, control: { data } } = this.props;
    const deltaPosition = data[`${type}`];
    // console.log(delta);
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

  save = () => {
    const {
      dispatch,
      match: {
        params: { deviceIp },
      },
      control,
    } = this.props;
    dispatch({
      type: 'control/savedeviceDetail',
      payload: {
        deviceIp,
        control,
      },
    });
  }

  render() {
    const {
      dispatch,
      control,
      control: {
        data: {
          button,
          lbutton,
          checkbox,
          video,
        },
        popoVisible,
        popoSelected,
        modalsVisible,
        checkedFlag,
      },
    } = this.props;
    // console.log(checkedFlag);
    return (
      <div>
        <NavBar
          className={styles.navbar}
          rightContent={[
            <Popover
              mask
              key="1"
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={popoVisible}
              overlay={[
                (<Popover.Item key="1" value="button">按钮</Popover.Item>),
                (<Popover.Item key="2" value="lbutton">方形按钮</Popover.Item>),
                (<Popover.Item key="3" value="checkbox">复选框</Popover.Item>),
                (<Popover.Item key="4" value="video" >视频组件</Popover.Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <div
                  key="1"
                  style={{
                    background: '#FFCC00',
                    fontSize: 14,
                    marginRight: 15,
                  }}
                  // onClick={this.add}
                >
                  添加
                </div>
              </div>
            </Popover>,
            <div
              key="2"
              style={{
              background: '#FFCC00',
              fontSize: 14,
              marginRight: 15,
            }}
              onClick={this.save}
            >
              保存
            </div>,
          ]}
        >
          我的设备
        </NavBar>
        <ModalsBasic
          dispatch={dispatch}
          control={control}
          popoSelected={popoSelected}
          modalsVisible={modalsVisible}
          checkedFlag={checkedFlag}
        />
        {
          (button && button.length > 0)
            ? button.map(item => (
              <Draggable
                key={item.id}
                defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
                onDrag={this.handleDrag('button', item.id)}
              >
                <span style={{ display: 'inline-block', margin: 5 }}>
                  <Button
                  // key={item.id}
                    className={styles.control_btn}
                    onClick={() => console.log(item.id)}
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
                defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
                onDrag={this.handleDrag('lbutton', item.id)}
              >
                <span style={{ display: 'inline-block', margin: 5 }}>
                  <Button
                  // key={item.id}
                    size="small"
                    className={styles.control_lbtn}
                    onClick={() => console.log(item.id)}
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
              defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
              onDrag={this.handleDrag('checkbox', item.id)}
            >
              <span style={{ display: 'inline-block', margin: 5 }}>
                <input
                  type="checkbox"
                  value="点甜"
                  checked={checkedFlag[item.id - 1]}
                  onChange={() => this.onChange(item.id - 1)}
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
              defaultPosition={{ x: item.deltaPosition.x, y: item.deltaPosition.y }}
              onDrag={this.handleDrag('video', item.id)}
            >
              <span style={{ display: 'inline-block', margin: 5 }}>
                <Reflv
                  url={item.text}
                  type={item.value}
                  isLive
                  cors
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

export default ControlEdit;
