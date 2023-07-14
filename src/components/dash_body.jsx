import React from 'react';
import './dash_body.css';
import Task from './task';
import PropTypes from 'prop-types';

function Dash_body({ priority, profile, filter }) {
  
  return (
    <div className='body_container'>
      <div className="body_left">
        <h4>notification center</h4>
        <div className="notifications">
          <button className='btn'>new tasks</button>
          <button className='btn'>new messages</button>
          <button className='btn'>due dates</button>
        </div>
        <div className="teams">
          <h4>Teams:</h4>
          <button className='btn'>All</button>
          <button className='btn'>tumbili</button>
          <button className='btn'>scorpion</button>
          <button className='btn'>simba</button>
        </div>
      </div>
      <div className="body_right">
        <Task priority={priority} profile={profile}  filter = {filter}/>
      </div>
    </div>
  );
}

Dash_body.propTypes = {
  priority: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

export default Dash_body;
