import React from 'react'
import './login.css'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import './register.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { apiDomain } from '../utils/utils'

function Register() {

const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        email: yup.string().required().email('Invalid email format'),
        team: yup.string().required()

    })
     
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    })

    const onsubmit = async (data) => {
        console.log(data)
        await Axios
        .post(`${apiDomain}/auth/register`, data)
        .then((response) => {
            console.log(response.data.message);
            alert(response.data.message);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.response.data.error);
            alert(error.response.data.error);
            alert(error.message);
        });
    }

  return (
    <div className='register'>
        <h3>Register</h3>
        <form action="" className = "form" onSubmit={handleSubmit(onsubmit)}>
    <>
    <input type="text" {...register('username')} placeholder='username' />
    {/* <p>{errors.username?.message}</p> */}
    </>

    <>
    <input type="text" {...register('email')} placeholder='email' />
    {/* <p>{errors.username?.message}</p> */}
    </>

    <>
    <input type="text" {...register("password")} placeholder='password' />
    {/* <p>{errors.username?.username}</p> */}
    </>

    <>
    {/* <input type="text" {...register('confirmpassword')} placeholder='confirmpassword' /> */}
    {/* <p>{errors.username?.message}</p> */}
    </>

    <>
    <input type="text" {...register("team")} placeholder='team...' />
    {/* <p>{errors.username?.username}</p> */}
    </>

    <input type="submit"  />
</form>
    </div>
  )
}

export default Register