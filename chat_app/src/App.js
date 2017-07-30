import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './Components/NameForm';
import io from 'socket.io-client';


class App extends Component {

  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
    this.value = 'test';
    const player1_pattern = [0,2,4,7,9,11,13,15,17,18]
    const player1_turn = []

    this.addUser = this.addUser.bind(this);
  }
  
  addUser(event) {
    console.log(event.target);
  }

  render() {
    return (
      <div>
        <NameForm />
        <NameForm2 addUser={this.addUser}/>
      </div>
    );
  }
}

const NameForm2 = ({addUser}) => {
  return (
    <div>
      <input onChange={console.log('changed')} ref={input => this.textInput = input} type="text"/>
      <button onClick={addUser}>Enter UserName</button>
    </div>
  )
}


export default App;
