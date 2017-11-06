import React, { Component } from 'react';

class Game extends Component {
  render() {
    return(
      <div>
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
    )
  }
}