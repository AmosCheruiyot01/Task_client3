import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './dash_header.css';
import { FaRegUser, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { InitialTasks } from './data';
import { useNavigate } from 'react-router-dom';
import { Context } from './context/userContext/context';
import { useContext } from 'react';
import { profileContext } from './dashboard';

function Dash_header({
  priority,
  setPriority,
  profile,
  setProfile,
  filter,
  setFilter,
}) {
  const { output } = useContext(profileContext);
  const { user, dispatch } = useContext(Context);

  const Navigate = useNavigate();
  useEffect(() => {
    // Your useEffect logic here
  }, [filter]);

  const handleProfileChange = (e) => {
    setProfile(e.target.value);
  };

  const handleLogoutClick = () => {
    Navigate('/');
    dispatch({ type: 'LOGOUT' });
  };

  function uniqueProfiles() {
    let profiles = [];
    output.forEach((task) => {
      if (!profiles.includes(task.doneBy)) {
        profiles.push(task.doneBy);
      }
    });
    return profiles;
  }

  const profiles = uniqueProfiles();

  return (
    <div className='header_container'>
      <div className='left_section'>
        <FaRegUser className='user_avatar' />
        <h4>hello {user.username}</h4>
        <p className='btn' style={{marginBottom:'4px'}}>{user.team}</p>
        <Link to='/task' className='btn'>
          add task
        </Link>
      </div>

      <div className='right_section'>
        <div className='right_top'>
          <div>
            Filter by: <FaFilter className='filter_icon' />
          </div>
          <button className='btn' style={{ color: 'red' }} onClick={handleLogoutClick}>
            log_out
          </button>
        </div>

        <div className='right_bottom'>
 <div>
            <span>due Date:</span>
            <select
              name=''
              id=''
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value='all'>All</option>
              <option value='high'>In a week</option>
              <option value='low'>In a month</option>
              <option value='medium'>In a year</option>
            </select>
          </div>

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
            <select name='' id='' value={profile} onChange={handleProfileChange}>
              <option value='all'>All</option>
              {profiles.map((profile) => (
                <option value={profile} key={profile}>
                  {profile}
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
