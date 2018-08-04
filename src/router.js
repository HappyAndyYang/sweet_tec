import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import Dynamic from 'dva/dynamic';
// import { getRouterConfig } from './common/router';
// console.log(getRouterConfig());

function RouterConfig({ history, app }) {
  const Order = Dynamic({
    app,
    models: () => [import('./models/order')],
    component: () => import('./routes/order/Order'),
  });
  const OrderSucess = Dynamic({
    app,
    models: () => [import('./models/order')],
    component: () => import('./routes/order/OrderSucess'),
  });
  const DeviceList = Dynamic({
    app,
    models: () => [import('./models/devices')],
    component: () => import('./routes/devices/Devices'),
  });
  const DeviceDetail = Dynamic({
    app,
    models: () => [import('./models/control')],
    component: () => import('./routes/control/Control'),
  });
  const ControlEdit = Dynamic({
    app,
    models: () => [import('./models/control')],
    component: () => import('./routes/control/ControlEdit'),
  });

  return (
    <Router history={history}>
      <Switch>
        {/* <Route exact path="/login" component={Order} />
        <Route exact path="/login/sucess" component={OrderSucess} /> */}
        <Route exact path="/login/sucess" component={Order} />
        <Route exact path="/login" component={OrderSucess} />
        <Route exact path="/device" component={DeviceList} />
        <Route exact path="/deviceDetail/:deviceIp" component={DeviceDetail} />
        <Route exact path="/deviceDetail/controlEdit/:deviceIp" component={ControlEdit} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
