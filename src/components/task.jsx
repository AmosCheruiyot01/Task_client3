import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineComment, AiOutlineUser } from 'react-icons/ai';
import './task.css';
import PropTypes from 'prop-types';
import Profile from './profile';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { Context } from './context/userContext/context';
import { bodyContext } from './dash_body';
import { profileContext } from './dashboard';
import { appContext } from '../App';
import PendingList from './pendingList';


function Task({ priority, profile, setUpdateBtn, updateBtn,  setUpdateContent, active }) {
  const [profDetails, setProfDetails] = useState(true);
  const [profileName, setProfileName] = useState('');
  const { user } = useContext(Context);
  const{output, setOutput} = useContext(profileContext)
  const{setRoom, room} =useContext(appContext);
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const[roomId, setRoomId] = useState('');
const {setTaskId, setDueDates} = useContext(bodyContext);
const[myTeam, setMyTeam] = useState('');


  const navigate = useNavigate();

  // get tasks
  const getTasks = async () => {
    try {
      const res = await Axios.get(`${apiDomain}/tasks`, {
        headers: { Authorization: `${user.token}` },
      });
      setAllTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  useEffect(() => {
    getTasks();
  }, [user.token]);

  console.log('allTasks', allTasks);
  console.log('active', active);

  const FilterTaskByTeam = async () => {
    try {
      const res = await Axios.get(`${apiDomain}/tasksByTeam/${active}`, {
        headers: { Authorization: `${user.token}` },
      });
      setFilteredTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (active !== 'all') {
      FilterTaskByTeam();
    }
  }, [active]);

  console.log(output);

  // toggle filter buttons
  useEffect(() => {
    let tasksToFilter = active === 'all' ? allTasks : filteredTasks;
    let filteredTasksResult = tasksToFilter;

    if (profile !== 'all' && priority !== 'all') {
      filteredTasksResult = tasksToFilter.filter(
        (task) => task.doneBy === profile && task.priority === priority
      );
    } else if (profile !== 'all') {
      filteredTasksResult = tasksToFilter.filter((task) => task.doneBy === profile);
    } else if (priority !== 'all') {
      filteredTasksResult = tasksToFilter.filter((task) => task.priority === priority);
    }

    setOutput(filteredTasksResult);
  }, [allTasks, filteredTasks, active, profile, priority]);

 // Helper function for calculating date difference with the current date
function dateDifferenceWithCurrentDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  const dueDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  const differenceInMilliseconds = dueDate - currentDate;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.ceil(differenceInDays); // Using ceil to round up to the next whole number of days
}


  // filter approaching deadlines
  function filterAndSetDueDates(output) {
    const filteredDates = output.filter((date) => {
      const daysUntilDue = dateDifferenceWithCurrentDate(date.endDate); // Return true for approaching deadlines, false for past deadlines
      console.log(daysUntilDue);
      return daysUntilDue <= 100 && daysUntilDue > 0;
      
    });
    
    setDueDates(filteredDates);
  }
  
  
  useEffect(() => {
    filterAndSetDueDates(output);
  }, [output]);

  // handle profile buttons
  const handleProfBtn = (name) => {
    setProfDetails(!profDetails);
    setProfileName(name.doneBy);
    setMyTeam(name.team);

  };

  // delete task
  const deleteTask = async (id) => {
    try {
      const res = await Axios.delete(`${apiDomain}/tasks/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      console.log(res);
      getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // onclick updateBtn
  const onclickUpdateBtn = (task) => {
    setUpdateBtn(!updateBtn);
    setUpdateContent(task);
    setTaskId(task.id);
  };

 const handleMessageClick = (team) =>{
  if(user.team == team){
    // console.log('Clicked, team:', team);
  setRoom(team)
  navigate('/comments');
}
 }



  console.log(room);

  return (
    <>
        <p style={{display:output ? "none" : ""}}>No tasks found</p>
      <div className="task">
        {output.map((task) => (
          <div className="tasks" key={task.id}>
            <div className="task_header">
              <button onClick={() => handleProfBtn(task)} className='btn'>
                <AiOutlineUser />
              </button>
              <h5>{task.task}</h5>
              <button onClick={() => handleMessageClick(task.team)} className='btn' style={{backgroundColor: `${user.team !== task.team? 'gray' : ''}`}}>
                <AiOutlineComment />
              </button>
            </div>
            <p>{task.description}</p>
            <div className="task_dates">
              <p>start: {task.startDate}</p>
              <p>due: {task.endDate}</p>
            </div>
            <span>priority: {task.priority}</span>
            <div className="progress_wrapper">
              <p>progress:</p>
              <div className="progress">
                <div className="progress_bar" style={{ width: task.progress }}>
                  {task.progress}
                </div>
              </div>
            </div>
            <button
              className={`btn done ${task.doneBy == user.username? '': 'disabled_button'}`}
              style={{ display: task.progress === '100%' ? '' : 'none' }}
              onClick={() => deleteTask(task.id)} 
            >
              DONE!
            </button>
            <button
              className={`btn  ${task.doneBy == user.username? '': 'disabled_button'}`}
              style={{ display: task.progress === '100%' ? 'none' : '' }}
              onClick={() => onclickUpdateBtn(task)}
            >
              updates
            </button>
          </div>
        ))}
      </div>
      <PendingList/>
      <Profile
        profDetails={profDetails}
        setProfDetails={setProfDetails}
        profileName={profileName}
        output={output}
        myTeam={myTeam}
      />

    </>
  );
}

Task.propTypes = {
  priority: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  setUpdateBtn: PropTypes.func.isRequired,
  updateBtn: PropTypes.bool.isRequired,
  output: PropTypes.array.isRequired,
  setOutput: PropTypes.func.isRequired,
  setUpdateContent: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default Task;
