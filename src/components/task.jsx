import { useState, useEffect } from 'react';
import { AiOutlineComment, AiOutlineUser } from 'react-icons/ai';
import './task.css';
import { InitialTasks } from './data';
import PropTypes from 'prop-types';

function Task({ priority, profile }) {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    let filteredTasks = InitialTasks;

    if (profile !== 'all' && priority !== 'all') {
      filteredTasks = InitialTasks.filter(
        (task) => task.doneBy === profile && task.priority === priority
      );
    } else if (profile !== 'all') {
      filteredTasks = InitialTasks.filter((task) => task.doneBy === profile);
    } else if (priority !== 'all') {
      filteredTasks = InitialTasks.filter((task) => task.priority === priority);
    }

    setOutput(filteredTasks);
  }, [profile, priority]);

  return (
    <div className="task">
      {output.map((task) => (
        <div className="tasks" key={task.tittle}>
          <div className="task_header">
            <AiOutlineUser />
            <h5>{task.tittle}</h5>
            <AiOutlineComment />
          </div>
          <p>{task.description}</p>
          <div className="task_dates">
            <p>start: {task.StartDate}</p>
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
          <p>{task.doneBy}</p>
        </div>
      ))}
    </div>
  );
}

Task.propTypes = {
  priority: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
};

export default Task;
