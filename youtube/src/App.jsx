import { Suspense, lazy, useState } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import { Route, Routes } from "react-router-dom";
import YouTubeLoader from './component/YouTubeLoader';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Video = lazy(() => import('./pages/Video'));
const Profile = lazy(() => import('./pages/Profile'));
const VideoUpload = lazy(() => import('./pages/VideoUpload'));
const SignUp = lazy(() => import('./pages/SignUp'));
const UpdateVideo = lazy(() => import('./pages/UpdateVideo'));

function App() {
  const [sideNavbar, setSideNavbar] = useState(false);

  const setSideNavBarFun = (value) => {
    setSideNavbar(value);
  };

  return (
    <>
      <Navbar setSideNavBarFun={setSideNavBarFun} sideNavbar={sideNavbar} />
      <Suspense fallback={<div className="flex justify-center items-center h-screen">
        <YouTubeLoader />
      </div>}>
        <Routes>
          <Route path='/' element={<Home sideNavbar={sideNavbar} setSideNavbar={setSideNavBarFun} />} />
          <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar} />} />
          <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} setSideNavbar={setSideNavBarFun} />} />
          <Route path='/:id/upload' element={<VideoUpload />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/:id/update' element={<UpdateVideo />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
