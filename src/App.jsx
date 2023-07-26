import { useState, createContext } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Header from './pages/header'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './components/dashboard'
import TaskInputForm from './components/taskInputForm'
import Comments from './components/comments'



export const appContext = createContext();
function App() {
const [room, setRoom] = useState('');
const[describer, setDescriber] = useState('');

  return (
    <>
    <appContext.Provider value={{room, setRoom, describer, setDescriber}}>
      
    <BrowserRouter>
        <Routes>
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<TaskInputForm />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </BrowserRouter>
      </appContext.Provider>

    </>
  )
}

export default App
