import React, { Component } from 'react';

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

export default Tile;