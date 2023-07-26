import React  from 'react';
import './update.css';
import PropTypes from 'prop-types';
import { apiDomain } from '../utils/utils';
import Axios from 'axios';
import { bodyContext } from './dash_body';
import { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

function Update({ updateBtn, setUpdateBtn, updateContent, setUpdateContent }) {
  const { taskId, setTaskId } = useContext(bodyContext);

  const schema = yup.object().shape({
    task: yup.string(),
    description: yup.string(),
    startDate: yup.string(),
    endDate: yup.string(),
    priority: yup.string(),
    doneBy: yup.string(),
    team: yup.string(),
    progress: yup.string(),
  });

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  
  });

  useEffect(() => {
    // When updateContent changes (e.g., when you click edit for another task),
    // update the form values with the new content.
    setValue('task', updateContent.task);
    setValue('description', updateContent.description);
    setValue('startDate', updateContent.startDate);
    setValue('endDate', updateContent.endDate);
    setValue('priority', updateContent.priority);
    setValue('doneBy', updateContent.doneBy);
    setValue('team', updateContent.team);
    setValue('progress', updateContent.progress);
  }, [updateContent]);
  
  // update function
  const handleSubmiter = async (data) => {
    console.log('Form data:', data);
    console.log('taskId:', taskId);
    await Axios.put(`${apiDomain}/tasks/${taskId}`, data)
      .then((response) => {
        if (response.data) {
          // response.data.message && alert(response.data.message);
          console.log(response);
          setUpdateBtn(!updateBtn);
          window.location.reload(); 
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
  
  };

  return (
    <div className={`update_container ${updateBtn ? '' : 'activator'}`}>
      <div className="formWrapper">
        <button onClick={() => setUpdateBtn(!updateBtn)} className="btn" style={{ color: 'red' }}>
          Close
        </button>
        <form action="" className="background" onSubmit={handleSubmit(handleSubmiter)}>
          <input type="text" className="util" {...register('task')} defaultValue={updateContent.task} />

          <textarea
            name=""
            id=""
            cols="50"
            rows="6"
            {...register('description')}
            defaultValue={updateContent.description}
          ></textarea>

          <div className="creds">
            <input
              type="text"
              {...register('startDate')}
              placeholder="start:YYYY-MM-DD"
              defaultValue={updateContent.startDate}
            />
            <input
              type="text"
              placeholder="end:YYYY-MM-DD"
              {...register('endDate')}
              defaultValue={updateContent.endDate}
            />
          </div>

          <div className="creds">
            <input
              type="text"
              placeholder="by:"
              {...register('doneBy')}
              defaultValue={updateContent.doneBy}
            />
            <input
              type="text"
              placeholder="priority:"
              {...register('priority')}
              defaultValue={updateContent.priority}
            />
          </div>

          <div className="creds">
            <input type="text" placeholder="team:" {...register('team')} defaultValue={updateContent.team} />
            <input
              type="text"
              placeholder="progress: 50%"
              {...register('progress')}
              defaultValue={updateContent.progress}
            />
          </div>
          <input type="submit" className="btn submit" />
        </form>
      </div>
    </div>
  );
}

Update.propTypes = {
  updateBtn: PropTypes.bool.isRequired,
  setUpdateBtn: PropTypes.func.isRequired,
  updateContent: PropTypes.object.isRequired, // Use PropTypes.object instead of PropTypes.array
  setUpdateContent: PropTypes.func.isRequired,
};

export default Update;
