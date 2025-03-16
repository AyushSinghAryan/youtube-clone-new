import { useState } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { Route, Routes } from "react-router-dom"
import Video from './pages/Video'
import Profile from './pages/Profile'
import VideoUpload from './pages/VideoUpload'
import SignUp from './pages/SignUp'
function App() {
  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavBarFun = (value) => {
    setSideNavbar(value);
  }
  return (
    <>
      <Navbar setSideNavBarFun={setSideNavBarFun} sideNavbar={sideNavbar} />
      <Routes >
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar} />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

    </>
  )
}

export default App
