import ReactDOM from 'react-dom';
import appRouter from './router.jsx';

import 'weui';
import 'react-weui/build/packages/react-weui.css';

import './style/main.less';



ReactDOM.render(
    appRouter,
    document.getElementById('app')
);