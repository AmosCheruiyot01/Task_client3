import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './dash_header.css';
import { FaRegUser, FaFilter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { InitialTasks } from './data';

function Dash_header({
  priority,
  setPriority,
  profile,
  setProfile,
  filter,
  setFilter,
}) {
  useEffect(() => {
    
  }, [filter]);

  const handleProfileChange = (e) => {
    setProfile(e.target.value);
  };

  return (
    <div className='header_container'>
      <div className='left_section'>
        <FaRegUser className='user_avator' />
        <h4>hello amos</h4>
        <Link to='/task' className='btn'>
          add task
        </Link>
      </div>

      <div className='right_section'>
        <div className='right_top'>
          <div>
            Filter by: <FaFilter className='filter_icon' />
          </div>
          <button className='btn' style={{ color: 'red' }}>
            log_out
          </button>
        </div>

        <div className='right_bottom'>
          <button className='btn'>due date</button>

          <div style={{ textAlign: 'center' }}>
            <span>priority:</span>
            <select
              name=''
              id=''
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value='all'>All</option>
              <option value='high'>high</option>
              <option value='low'>low</option>
              <option value='medium'>medium</option>
            </select>
          </div>

          <div>
            <span>profile:</span>
            <select
              name=''
              id=''
              value={profile}
              onChange={handleProfileChange}
            >
              <option value='all'>All</option>
              {InitialTasks.map((task) => (
                <option value={task.doneBy} key={task.tittle}>
                  {task.doneBy}
                </option>
              ))}
            </select>
          </div>

          <button className='btn filter' onClick={() => setFilter(!filter)}>
            Filter!
          </button>
        </div>
      </div>
    </div>
  );
}

Dash_header.propTypes = {
  priority: PropTypes.string,
  setPriority: PropTypes.func,
  profile: PropTypes.string,
  setProfile: PropTypes.func,
  filter: PropTypes.bool,
  setFilter: PropTypes.func,
};

export default Dash_header;
