import React, { Component } from 'react';

const NameForm = props => {
  return (
    <div className="userForm container">                    
      <h1 className="display-3"><span>DotaDraft</span></h1>            
      <p>Enter a username to get started</p>
      <p className="lead">
        <input onChange={this.props.handleChange} type="text" />
        <a onClick={this.props.addUser} className="btn btn-primary btn-lg" href="#" role="button">Start</a>
      </p>          
    </div>
  )
};

export default NameForm;