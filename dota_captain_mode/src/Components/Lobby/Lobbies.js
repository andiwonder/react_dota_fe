import React, { Component } from 'react';
import './Users.css';

// users, heros
class Lobbies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages : [],
      img_url : '',
      all_msgs : [],
      users: ['dotabheem','lqt1','revel2k9']
    }
  }

  render () {
    

    // let hero_pin = this.heros[Math.floor(Math.random()*heros.length)];
    // const usersList = this.props.users.map((user) => {
    const usersList = this.state.users.map((user) => {
      return (
        <tr>        
          <th className="align-items-end">
            <img className="user_avatar rounded-circle" src="../images/pins/Pin_Io.png" alt="Card image cap"/>                
            <h4 className="card-title">{user}</h4>        
          </th>        
        </tr>      
      )
    });
        
    return (       
      <h1>Lobbies</h1>
    )
  }
};

const Tile = (src) => {
  return <img src={src} />
}

export default Lobbies;