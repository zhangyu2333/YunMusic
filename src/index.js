import dva from 'dva';
import './common/css/common.scss';
import './common/js/flexible';
var FastClick = require('fastclick');
FastClick.attach(document.body);
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/indexPage').default);
app.model(require('./models/userinfo').default);
app.model(require('./models/playsong').default);

// 4. Router
app.router(require('./router.js').default);

// 5. Start
app.start('#root');
