import  {useEffect, useState, createContext} from 'react';
import './dash_body.css';
import Task from './task';
import PropTypes from 'prop-types';
import { InitialTasks } from './data';
import Update from './update';
import { apiDomain } from '../utils/utils';
import  Axios from 'axios';
import DueNotification from './dueNotification';
import PendingList from './pendingList';


export const bodyContext = createContext();
function Dash_body({ priority, profile, filter, allDueDates, setAllDueDates, output, setOutput}) {
  const [active, setActive] = useState('all');
  const[updateBtn, setUpdateBtn] = useState(false);
  const [dueDates, setDueDates] = useState([]);
  const[updateContent, setUpdateContent] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const[showDue, setShowDue] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [showPendingList, setShowPendingList] = useState(false)
  const[pendingCounter, setPendingCounter] = useState('');




  

// fetch all teams
  const fetchAllTeams = async() =>{
    const response = await Axios.get(`${apiDomain}/allTeams/`);
    setAllTeams(response.data);
    // const{showPendingList, setShowPendingList} = useContext(bodyContext);

  }

  console.log(allTeams)

  // // filter by teams
  // const filterByTeams = async(team) =>{
  //   const response = await Axios.get(`${apiDomain}/allTeams/${team}`);


  useEffect(() => {
    fetchAllTeams();
  },[]);

  // console.log(allTeams);

// console.log(active);
  
// unique teams
function uniqueTeams() {
  let teams = [];
 output.map((task) => {
    if (!teams.includes(task.team)) {
      teams.push(task.team);
    }
  });
  return teams;
}

const teams = uniqueTeams();


// console.log(teams );
const clickHandler = (team) => {
  setActive(team);
  // console.log(team)
  console.log('clicked');
}
console.log(active);

  return (
    <div className='body_container'>
      <bodyContext.Provider value={{dueDates, setDueDates, showDue, setShowDue, taskId, setTaskId}}>
      <div className="body_left">
        <h4>notification center</h4>
        <div className="notifications">
          <button className='btn' onClick={() => setShowPendingList(!showPendingList)}>pending tasks({pendingCounter})</button>
          <button className='btn' onClick={() => setShowDue(!showDue)}>due dates: ({dueDates.length})</button>
        </div>
        <div className="teams">
          <h4>Teams:</h4>
          <button className={`btn ${active == 'all'? 'active': ''}`} style={{color:"white"}}value={'all'}  onClick={(e) =>clickHandler(e.target.value)}>All</button>
       { allTeams.map((team) => (
          <button className={`btn ${team.team == active? 'active' : ''}`}  key ={team.team}  onClick={() =>clickHandler(team.team)} style={{color:"white"}}>{team.team}</button>
          ))} 
        </div>
      </div>
      <div className="body_right">
        <Task active = {active} priority={priority} profile={profile}  filter = {filter} setUpdateBtn={setUpdateBtn} updateBtn={updateBtn} 
        allDueDates={allDueDates} setAllDueDates={setAllDueDates} 
         output={output} setOutput={setOutput} updateContent={updateContent} setUpdateContent={setUpdateContent}/>
        <Update updateBtn = {updateBtn} setUpdateBtn={setUpdateBtn} updateContent={updateContent} setUpdateContent={setUpdateContent}/>
      </div>
<DueNotification/>
<PendingList showPendingList={showPendingList} setShowPendingList={setShowPendingList} pendingCounter={pendingCounter} setPendingCounter = {setPendingCounter}/>
        </bodyContext.Provider>
    </div>
  );
}

Dash_body.propTypes = {
  priority: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  allDueDates: PropTypes.array.isRequired,
  setAllDueDates: PropTypes.func.isRequired,
  output: PropTypes.array.isRequired,
  setOutput: PropTypes.func.isRequired,
};

export default Dash_body;
