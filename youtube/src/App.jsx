import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { Route, Routes } from "react-router-dom"
import Video from './pages/Video'
import Profile from './pages/Profile'
import VideoUpload from './pages/VideoUpload'
import SignUp from './pages/SignUp';
import axios from 'axios'
import UpdateVideo from './pages/UpdateVideo'
function App() {
  const [sideNavbar, setSideNavbar] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/allVideo/').then(
  //     res => { console.log(res) }
  //   ).catch(err => {
  //     console.log(err);

  //   })
  // }, [])

  const setSideNavBarFun = (value) => {
    setSideNavbar(value);
  }
  return (
    <>
      <Navbar setSideNavBarFun={setSideNavBarFun} sideNavbar={sideNavbar} />
      <Routes >
        <Route path='/' element={<Home sideNavbar={sideNavbar} setSideNavbar={setSideNavBarFun} />} />
        <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar} />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} setSideNavbar={setSideNavBarFun} />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id/update' element={<UpdateVideo />} />
      </Routes>

    </>
  )
}

export default App
