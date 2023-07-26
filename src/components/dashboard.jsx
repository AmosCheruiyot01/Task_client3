import React, { useState, createContext } from 'react';
import './dashboard.css';
import Dash_header from '../components/dash_header';
import Dash_body from '../components/dash_body';
import Dash_footer from '../components/dash_footer';


export const profileContext = createContext();
function Dashboard() {
  const [priority, setPriority] = useState('all');
  const [profile, setProfile] = useState('all');
  const [filter, setFilter] = useState(true); // Changed the initial value to a boolean
  const [allDueDates, setAllDueDates] = useState([])
  const [output, setOutput] = useState([]);



  


  // Convert the boolean 'filter' to a string before passing to Dash_body
  const filterString = filter.toString();

  return (
    <div className="container">
     <profileContext.Provider value={{output, setOutput}}>
     <div className="row">
        <Dash_header
          priority={priority}
          setPriority={setPriority}
          profile={profile}
          setProfile={setProfile}
          filter={filterString} // Pass the string version of the 'filter' prop
          setFilter={setFilter}
        />
      </div>

      <div className="row">
        <Dash_body priority={priority} profile={profile} filter={filter} allDueDates={allDueDates} setAllDueDates={setAllDueDates} output={output} setOutput={setOutput}/>
      </div>

      <div className="row">
        {/* <Dash_footer /> */}
      </div>
      </profileContext.Provider>
    </div>
  );
}

export default Dashboard;
