import React from 'react'
import './login.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { apiDomain } from '../utils/utils'
import { Context } from '../components/context/userContext/context'
import { useContext } from 'react'



function Login() {

    // use context
    const { dispatch } = useContext(Context)

    const Navigate = useNavigate()

    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
        team: yup.string().required()

    })

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    })

    const onsubmit = async(data) => {
        // console.log(data)
        await Axios.post(`${apiDomain}/auth/login`, data)
        .then(({data}) => {
            if(data.token) {
                dispatch({type: 'LOGIN_SUCCESS', payload: data})
                // alert('login successful')
                Navigate('/dash')
            }
        })
        .catch(err => {
            alert('login failed, error: ' + err.message)
        }
            )
    }

  

    return (
        <div className='landing_page'>
            <div className="log_header">
               <div className='head_logo'>
               </div>
               <div className="head_tittle">
                <h2>Get It Done!</h2>
               </div>
            </div>

           <div className="login">
            
           <div className='login_left'>
            
            <h3>login</h3>
            <form action="" className="form" onSubmit={handleSubmit(onsubmit)}>
                <>
                    <input type="text" {...register('username')} placeholder='username' />
                    {/* <p>{errors.username?.message}</p> */}
                </>

                <>
                    <input type="text" {...register("password")} placeholder='password' />
                    {/* <p>{errors.username?.username}</p> */}
                </>

                <>
                    <input type="text" {...register("team")} placeholder='team' />
                    {/* <p>{errors.username?.username}</p> */}
                </>

                <input type="submit" className='btn' style={{}} />

            </form>

<Link to="/register" className='link'>Register?</Link>

        </div>

<div className="login_right">
    <h4>created for greatness. Get ready to conquer challenges 
        and embrace success like never before. Let's get it done!</h4>
</div>

           </div>

            <div className="footer">
<h4>footer</h4>
            </div>
        </div>
    )
}

export default Login