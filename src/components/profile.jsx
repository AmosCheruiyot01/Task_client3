import React, { useEffect, useState } from 'react';
import './profile.css';
import { InitialTasks } from './data';
// import prop validator
import PropTypes from 'prop-types';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { useContext } from 'react';
import { Context } from './context/userContext/context';



function Profile({ profDetails, setProfDetails, profileName, output, myTeam }) {

const[filteredTasks, setFilteredTasks] = useState([]);
const {user} = useContext(Context);

  const userDetails = output
  .filter((task) => task.doneBy === profileName)
  // .flatMap((user) => user.tasks);
  ;
console.log(filteredTasks);

// fetching tasks bym teams
const FilterTaskByTeam = async () => {
  try {
    const res = await Axios.get(`${apiDomain}/tasksByTeam/${myTeam}`, {
      headers: { Authorization: `${user.token}` },
    });
    setFilteredTasks(res.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

useEffect(() => {
  FilterTaskByTeam();
}, [myTeam]);


  return (
    <div  className={`prof_background ${profDetails ? 'prof_active' : ''}`} onClick={() => setProfDetails(!profDetails)} >
      {userDetails.map((detail) => (
        <div key={detail.id} className={`profile-container ${profDetails ? 'prof_active' : ''}`} onClick={() => setProfDetails(!profDetails)}>
          <div className="profile">
            <h4>PROFILE</h4>
            <p>USERNAME: {detail.doneBy}</p>
            {/* <p>EMAIL: {detail.team}</p> */}
            <p>TEAM: {detail.team}</p>
          </div>

          <div className="profile_tasks">
            <h4>TASKS</h4>
            <ol>
              {
                filteredTasks.map((taskTitle) => (
                  <li key={taskTitle}>{taskTitle.task}</li>
                ))
              }
                <li>{detail.task}</li>
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}

// prop validator
Profile.propTypes = {
  profDetails: PropTypes.bool.isRequired,
  setProfDetails: PropTypes.func.isRequired,
  profileName: PropTypes.string.isRequired,
  output: PropTypes.arrayOf(PropTypes.object).isRequired,
  myTeam: PropTypes.string.isRequired,
};

export default Profile;
