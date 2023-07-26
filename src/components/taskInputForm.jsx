import React from 'react'
import './taskInputForm.css';
import * as yup from 'yup';
import  {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Axios from 'axios';
import { apiDomain } from '../utils/utils';
import { appContext } from '../App';
import { useContext } from 'react';

function TaskInputForm() {

  const{describer, setDescriber} = useContext(appContext);

const schema = yup.object().shape({
    task: yup.string().required(),
    description: yup.string().required(),
    startDate: yup.string().required('YYYY-MM-DD format required!').matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    endDate: yup.string().required().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    priority: yup.string().required(),
    doneBy: yup.string().required(),
    team: yup.string().required(),
    progress: yup.string()
    .required('Progress is required')
    .matches(/^(100|[1-9]?[0-9])%$/, 'Progress must be a number between 1 and 100 and in %'),
    })

const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
})

const onsubmit = (data) => {
    console.log(data);
  Axios.post(`${apiDomain}/tasks`, data)
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
    });
}


  return (
    
<div className="taskInput">
<form action="" className='main' onSubmit={handleSubmit(onsubmit)}>

<input type="text" {...register("task")}placeholder='enter your task head' className='util' defaultValue={describer} />

<textarea name="" id="" cols="50" rows="6" {...register("description")}placeholder='description' style={{color: "black"}}></textarea>
<div className="creds">
<input type="text" {...register("startDate")}placeholder='start:YYYY-MM-DD' />
<input type="text" {...register("endDate")} placeholder='end:YYYY-MM-DD' />
</div>

<div className="creds"> 
<input type="text" {...register("doneBy")} placeholder='by:' />
<input type="text" {...register("priority")} placeholder='priority:' />
</div>

<div className="creds"> 
<input type="text" {...register("team")} placeholder='team:' />
<input type="text" {...register("progress")} placeholder='progress: 50%' />
</div>

<input type="submit" className='btn submit'/>

</form>
</div>

    
  )
}

export default TaskInputForm