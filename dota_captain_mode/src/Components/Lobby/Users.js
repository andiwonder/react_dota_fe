import React, { Component } from 'react';
import './Users.css';

// users, heros
class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages : [],
      img_url : '',
      all_msgs : [],
      users: ['dotabheem','lqt1','revel2k9']
    }

    this.handleChange = this.handleChange.bind(this);
    this.getGif = this.getGif.bind(this);
    this.getGif2 = this.getGif2.bind(this);
  }

  handleChange(e) {
    let input = e.target.value;
    // console.log('handle change : ' + input);
    this.setState({message : input});
  }

  getGif(query) {
    // console.log('getting gif');
    return new Promise(function(resolve,reject) {
      const url = 'http://localhost:8000/gifs?&q=' + query;    
      fetch(url)
      .then(res => res.json())
      .then((out) => {      
        let api_data = out.data[Math.floor(Math.random()*out.data.length)];
        // console.log('step 2 p1');      
        resolve(api_data.images.fixed_width.url);            
      });    
    })
    .catch(err => console.error(err));
  }

  getGif2(query){
    return new Promise(function(resolve,reject) {
      const url = 'http://localhost:8000/gifs?&q=' + query;    
      fetch(url)
      .then(res => res.json())
      .then((out) => {      
        let api_data = out.data[Math.floor(Math.random()*out.data.length)];
        // console.log('step 2 p1');      
        return <p>{api_data.images.fixed_width.url}</p>;            
      });    
    });
  } 

  componentWillReceiveProps(nextProps) {    
    
    console.log(nextProps);
    if(nextProps.messages == null) return;        
    const message = nextProps.messages[nextProps.messages.length-1];
    if(message == null) return;
    if (message.substring(0,4) == ":gif") {
        console.log('gif found');
        let query = message.split(" ")[0].replace(/:gif_/g, "");                
        this.getGif(query).then((data) => {
          // console.log(data);
          let type = {type: 'img',src: data};
          let msgs_arr = [...this.state.messages];
          // console.log(msgs_arr);
          msgs_arr.push(type);
          console.log(msgs_arr);
          this.setState({...this.state,messages: msgs_arr});
          this.setState({img_url:data});          
        })                       
    } else {
        // console.log('txt here');
        let type = {type: 'txt', text: message};
        let msgs_arr = [...this.state.messages];
        // console.log(msgs_arr);
        msgs_arr.push(type);
        // console.log(msgs_arr);
        this.setState({...this.state,messages: msgs_arr});
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

    console.log(this.props.messages);
    console.log(this.state.messages);
    let all_messages = [];

    const messageList = this.state.messages.map((message) => {      
      if (message.type == "txt") {        
          return <p className="lead">{message.text}</p>                               
      } else if (message.type == 'img' ) {      
        return <img src={message.src} alt=""/>
      }
    })
    
    

    return (       
      <div className="users_panel col-md-12">
        <nav className="nav nav-masthead">
          <a className="nav-link active" href="#">Users</a>
          <a className="nav-link" href="#">Lobbies</a>
          <a className="nav-link" href="#">Messages</a>
        </nav>
        <div className="row">
          <div className="col-md-3 users_list">
            <table className="table">
              <tbody>
                {usersList}
              </tbody>
            </table>
          </div>
          <div className="col-md-9 chat_box">
            <div className="jumbotron-fluid chat_display">
              {this.state.messages.length === 0 ? <h1 className="display-3">Send Message to other users</h1> : null}
              {this.state.messages.length === 0 ? <h3 className="display-5">use :gif to get gifs .ex :gif_dota_death</h3> : null}
              {this.state.messages.length === 0 ? <h3 className="display-5">use :dota to get dota emoticon ex :dota_thinking</h3> : null}                                                        
              {messageList}              
              <p className="lead"></p>
            </div>                    
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Enter message" 
                aria-describedby="basic-addon2" onChange={this.handleChange}/>
              <a className="btn btn-lg btn-success"role="button" 
                 onClick={() => this.props.sendMessage(this.state.message)}
              >Send
              </a>
            </div>
          </div>
        </div>    
      </div>
    )
  }
};

const Tile = (src) => {
  return <img src={src} />
}

export default Users;