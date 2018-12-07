import React from 'react';
import { Router, NavLink } from 'dva/router';
import RouterView from './routerView/routerView';
import config from './routerView';
function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<React.Fragment>
				<RouterView routes={config.routes}></RouterView>
			</React.Fragment>
		</Router>
	);
}

export default RouterConfig;
