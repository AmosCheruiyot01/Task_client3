import React, { useState } from 'react';
import './dashboard.css';
import Dash_header from '../components/dash_header';
import Dash_body from '../components/dash_body';
import Dash_footer from '../components/dash_footer';

function Dashboard() {
  const [priority, setPriority] = useState('all');
  const [profile, setProfile] = useState('all');
  const [filter, setFilter] = useState(true); // Changed the initial value to a boolean

  return (
    <div className="container">
      <div className="row">
        <Dash_header
          priority={priority}
          setPriority={setPriority}
          profile={profile}
          setProfile={setProfile}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div className="row">
        <Dash_body priority={priority} profile={profile} filter = {filter}/>
      </div>

      <div className="row">
        {/* <Dash_footer /> */}
      </div>
    </div>
  );
}

export default Dashboard;
