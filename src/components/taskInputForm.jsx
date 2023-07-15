import React from 'react'
import './taskInputForm.css';
import * as yup from 'yup';
import  {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function TaskInputForm() {

const schema = yup.object().shape({
    taskHead: yup.string().required(),
    description: yup.string().required(),
    start: yup.string().required(),
    end: yup.string().required(),
    priority: yup.string().required(),
    by: yup.string().required(),
    team: yup.string().required()
})

const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
})

const onsubmit = (data) => {
    console.log(data)
}

  return (
    
<div className="taskInput">
<form action="" className='main' onSubmit={handleSubmit(onsubmit)}>

<input type="text" {...register("taskHead")}placeholder='enter your task head' className='util' />

<textarea name="" id="" cols="50" rows="6" {...register("description")}placeholder='description'></textarea>
<div className="creds">
<input type="text" {...register("start")}placeholder='start:' />
<input type="text" {...register("end")} placeholder='end:' />
</div>

<div className="creds"> 
<input type="text" {...register("by")} placeholder='by:' />
<input type="text" {...register("priority")} placeholder='priority:' />
</div>
<input type="text" {...register("team")} placeholder='team:' />

<input type="submit" className='btn submit'/>

</form>
</div>

    
  )
}

export default TaskInputForm