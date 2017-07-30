import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Users from './Components/Lobby/Users.js';

const cloudPath = 'http://d10bybrdwoa4y6.cloudfront.net/test/images/hero_pics/'
const cdnPath = 'http://cdn.dota2.com/apps/dota2/images/heroes/'
const cdnQuery = '_vert.jpg?v=4002487'
const localPath = '../heropics/'
const socket = io.connect('http://localhost:8000');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn_pattern : [1,2,1,2,1,2,2,1,2,1,2,1,2,1,2,1,2,1,1,2],
      order : ['b','b','p','p','b','b','p','p','b','p'],
      heros : [],
      heros_banned : [],
      p1_heros_banned : [],
      p2_heros_banned : [],
      heros_picked : [],
      p1_heros_picked : [],      
      p2_heros_picked : [],
      player_1_turn : true,
      username : '',
      messages : [],
      users : [],
    };

    this.handlePick = this.handlePick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  getHeroData () {
    let request = new XMLHttpRequest();
    request.open("GET", "../heros.json", false);
    request.send(null);
    const my_JSON_object = JSON.parse(request.responseText).result.heroes;
    const heroNames = [];
    my_JSON_object.map((hero) => {
      heroNames.push(hero.name.replace('npc_dota_hero_',''))
    })
    return heroNames;
  }

  sendMessage (message) {
    socket.emit('sending message', message)
  }

  componentDidMount() {
    const heroNames = this.getHeroData();
    socket.on('usernames', data => {
      this.setState({users : data});
    });
    socket.on('new message', data =>{
      const msgs_arr = this.state.messages.slice();
      msgs_arr.push(data);
      this.setState({messages: msgs_arr});      
    });
    this.setState({
      heros : heroNames,
    })    
  }


  addUser() {
    // console.log('adding user');
    // console.log(socket.emit);
    console.log(this.state.username);
    this.setState({username:this.state.username});
    socket.emit('new user', this.state.username, (data) => {
      if(data) {
        
      } else {
        
      }
    })
  }


  handlePick(value){
    // console.log(value);
    if (this.state.p1_heros_banned.indexOf(value) != -1 || this.state.p2_heros_banned.indexOf(value) != -1){
      return;
    };

    let next_turn;
    if (this.state.player_1_turn) {
      const p1_heros_banned_arr = this.state.p1_heros_banned.slice();
      p1_heros_banned_arr.push(value);
      next_turn = false;
      this.setState({player_1_turn : next_turn,p1_heros_banned: p1_heros_banned_arr});  
    } else {
      const p2_heros_banned_arr = this.state.p2_heros_banned.slice();
      p2_heros_banned_arr.push(value);
      next_turn = true;
      this.setState({player_1_turn : next_turn,p2_heros_banned: p2_heros_banned_arr});    
    } 
  }

  submitMove () {

  } 

  handleChange(e){    
    this.setState({username: e.target.value});
  }

  render() {

    const heroTiles = this.state.heros.map((hero) => {
      return <Tile key={hero}  value={hero}  handlePick={this.handlePick} />        
    });

    

    return (
      <div className="App">
        <div className="userForm container">                    
            <h1 className="display-3"><span>DotaDraft</span></h1>            
            <p>Enter a username to get started</p>
            <p className="lead">
              <input className="border-0" onChange={this.handleChange} type="text" />
              <a onClick={this.addUser} className="btn btn-primary btn-lg" href="#" role="button">Start</a>
            </p>          
        </div>
        <div className="container">
          <Users users={this.state.users} heros={this.state.heros} sendMessage={this.sendMessage}
                 messages={this.state.messages}/>
        </div>
        <div className = "info_bar">
          {this.state.player_1_turn ? 'player 1 turn' : 'player 2 turn'}
        </div>
        <div className="hero_container">
          {heroTiles}
        </div>
        <Banned_bar heros={this.state.p1_heros_banned} />
        <Banned_bar heros={this.state.p2_heros_banned} />
        <input type="button" value="Submit" onClick={this.subitMove} />
      </div>
    );
  }
}

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phase : 1,
    };
    this.handlePhase = this.handlePhase.bind(this);    
  }

  handlePhase() {
    this.setState({phase:2})
  }

  render(){
    return (
      <div className={ this.state.phase == 2 ? 'hero_tiles banned' : 'hero_tiles' } >
        <img          
          src={`${cdnPath}${this.props.value}${cdnQuery}`} 
          onClick={() => { 
            this.handlePhase();
            this.props.handlePick(this.props.value); }
        } />
      </div>
    )
  }
}

// const Tile = ({value, handlePick}) => {
//   return (
//     <div className='hero_tiles'>
//       <img src={`${cdnPath}${value}${cdnQuery}`} onClick={() => { handlePick(value) }} />
//     </div>
//   )
// }

const BarTile = ({value}) => {
  return (
    <div className='bar_tile'>
      <img src={`${cdnPath}${value}${cdnQuery}`} />
    </div>
  )
}


const Banned_bar = ({heros}) => {
   return (
    <div className="BanBar">
      { heros.map (hero => <BarTile value={hero} /> )}      
    </div>
  );
}

class Giphy extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return
  }
}

// class Chat extends Component {
//   render() {
//     <input type="text"/>
//   }
// }

class PicksBar extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit(e){
    e.preventDefault();
    const nextMove = this.state.isPlayer1Next ? "player1" : "player2";
    this.setState({
      isPlayer1Next: !nextMove,
    })
    this.state.socket.emit('next phase',nextMove);

  }

  render() {
    return (
      <div className="pick_ban_bar">
        <form>
          <input type="submit" onClick = {this.handleSubmit}/>
        </form>       
      </div>
    )
  } 
}

export default App;
