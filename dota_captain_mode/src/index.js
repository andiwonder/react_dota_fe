import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Clock from './Clock';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Clock />, document.getElementById('timer'));
// ReactDOM.render(<Clock />, document.getElementById('timer2'));
registerServiceWorker();

if (module.hot){
	module.hot.accept()
}