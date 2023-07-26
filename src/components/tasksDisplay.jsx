import React, { useEffect } from 'react'
import Axios from 'axios'
import { apiDomain } from '../utils/utils'
import { useState } from 'react'



function Tasks() {
    const[tasks, setTasks] = useState([])

    const getTasks = () =>{
        Axios.get(`${apiDomain}/tasks`)
        .then((response) => {
            if (response.data) {
                setTasks(response.data)
                console.log(response.data)
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
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

  return (
  )
}

export default Tasks