export const wxCode = 'wxCode';

export default {
  wxCode,
};

export const address = [
  {
    label: '金山区点甜机器人智慧农场',
    value: '金山区点甜机器人智慧农场',
  },
  // {
  //   label: '金山区前京大道277号 ™️：绍文雅兹',
  //   value: '金山区前京大道277号 ™️：绍文雅兹',
  // },
];

export const devices = {
  status: 0,
  message: '请求成功',
  data: {
    list: [
      {
        deviceName: '除草机',
        deviceIp: '192.168.1.1',
      },
      {
        deviceName: '收割机',
        deviceIp: '192.168.1.2',
      },
      {
        deviceName: '巡逻机',
        deviceIp: '192.168.1.3',
      },
      {
        deviceName: '起重机',
        deviceIp: '192.168.1.4',
      },
    ],
    currentPage: 1,
    pageSize: 10,
  },
};

export const controls = {
  status: 0,
  message: '请求成功',
  data: {
    button: [{
      text: '测试',
      value: 'test',
      id: 1,
      deltaPosition: { x: 0, y: 0 },
    }, {
      text: '哈呀',
      value: 'test',
      id: 2,
      deltaPosition: { x: 0, y: 0 },
    }],
    lbutton: [{
      text: '测试',
      value: 'test',
      id: 1,
      deltaPosition: { x: 0, y: 0 },
    }],
    checkbox: [{
      text: '测试',
      value: 'test',
      id: 1,
      deltaPosition: { x: 0, y: 0 },
    }],
    video: [{
      // text: 'http://www.best-sweet.top:3001/01.mp4',
      text: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      value: 'mp4',
      id: 1,
      deltaPosition: { x: 0, y: 0 },
    }],
  },
  popoVisible: false,
  popoSelected: '',
  modalsVisible: false,
  checkedFlag: [false],
};
