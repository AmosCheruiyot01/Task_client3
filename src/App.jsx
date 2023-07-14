import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// import Header from './pages/header'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './components/dashboard'
import TaskInputForm from './components/taskInputForm'
import Comments from './components/comments'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<TaskInputForm />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
