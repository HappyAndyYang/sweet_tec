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

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Order} />
        <Route exact path="/login/sucess" component={OrderSucess} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
