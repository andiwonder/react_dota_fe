import React, { Component } from 'react';
import { Link } from "react-router-dom";

const NameForm = props => {
  return (
    <div className="userForm container">                    
      <h1 className="display-3"><span>DotaDraft</span></h1>            
      <p>Enter a username to get started</p>
      <p className="lead">
        <input onChange={props.handleChange} type="text" />
        <Link to="/dashboard" className="btn btn-primary">Start</Link>
      </p>          
    </div>
  )
};

        // <a onClick={props.addUser} className="btn btn-primary btn-lg" href="#" role="button">Start</a>
export default NameForm;