import { useEffect, useState } from 'react'
import React from 'react'
import './pendingList.css'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { apiDomain } from '../utils/utils'
import  Axios  from 'axios'
import { appContext } from '../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function PendingList({showPendingList, setShowPendingList, pendingCounter, setPendingCounter}) {

  const{describer, setDescriber} = useContext(appContext);
  const navigate = useNavigate();

  const[taskInput, setTaskInput] = useState([]);
  // const[describer, setDescriber] = useState('');

// fetch all pending tasks
const fetchAllPendingTasks = async() =>{
  const response = await Axios.get(`${apiDomain}/pendingTasks`);
  setTaskInput(response.data);
  setPendingCounter(response.data.length)
}

useEffect(() => {
  fetchAllPendingTasks();
},[]);

  const  schema = yup.object().shape({
    task: yup.string().required()
  })

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  })

const handleSubmitter = (submitter) =>{
  // console.log(submitter)
  // create  a new pending task
  Axios.post(`${apiDomain}/pendingTasks/task`, submitter)
  .then((response) => {
    if (response.data) {
      response.data.message && alert(response.data.message);
      console.log(response);
    } else {
      alert('Unexpected response data format');
    }
  })
  .catch((error) => {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('An error occurred while processing the request.');
    }
  }
  );
  

  setTaskInput([...taskInput, submitter])
}

console.log(pendingCounter)

const handleClick = (task) =>{
  setDescriber(task);
  navigate('/task');
}

console.log(describer)

  return (
    <div className='pendingList'  style={{display: `${showPendingList? '' : "none"}`}}>
<div>
<button className= "btn" onClick={() => setShowPendingList(!showPendingList)}  style={{color: 'red'}}>close</button>

      <h3>Pending Tasks</h3>
      {taskInput.map((task, index) =>(
       
 <p className='btn' key={index}>{task.task}<button onClick={() =>handleClick(task.task)} className='pendingBtn'>proceed to create</button></p>
       
      ))
      }

 

 
 <form className="add"  onSubmit={handleSubmit(handleSubmitter)}>
 <input type="text" className='btn' {...register('task')} placeholder='add pending tasks' style={{width: '60%'}}/>
 <input type="submit" />
 </form>

</div>
    </div>
  )
}

PendingList.propTypes = {
  showPendingList: PropTypes.bool.isRequired,
  setShowPendingList: PropTypes.func.isRequired
}


export default PendingList