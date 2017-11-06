import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";


import NameForm from './Components/Lobby/NameForm';
import Nav from './Components/Lobby/Nav';
import Lobbies from './Components/Lobby/Lobbies';
import Users from './Components/Lobby/Users';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/dashboard" component={Users}>
          <Nav />
          <Route path="lobbies" component={Lobbies}/>
          <Route path="chat" component={Users}/>
        </Route>
        <Route path="/" component={NameForm}/>
        
      </Switch>
    </div>
  </BrowserRouter>
  , document.getElementById('root')
);
// ReactDOM.render(<Clock />, document.getElementById('timer'));
// ReactDOM.render(<Clock />, document.getElementById('timer2'));
registerServiceWorker();

if (module.hot){
	module.hot.accept()
}