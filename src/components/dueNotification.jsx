import React, { useContext } from 'react';
import './dueNotification.css'; // Assuming this is the correct CSS file path
import { bodyContext } from './dash_body';

function DueNotification() {
    const { dueDates, showDue, setShowDue } = useContext(bodyContext);
    console.log(dueDates);
  
    return (
      <div className={`dueNote ${showDue ? '' : 'dueActivator'}`}  onClick={() => setShowDue(!showDue)}>
        <div className="dueWrapper" >
          {dueDates.map((dueDate) => (
            <div className='taskDesc' key={dueDate.id}>
              <p><b>TASK:</b> {dueDate.task}</p>
              <p><b>DONE BY:</b> {dueDate.doneBy}</p>
              <p><b>START DATE:</b> {dueDate.startDate}</p>
              <p><b>END DATE:</b> {dueDate.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default DueNotification;
