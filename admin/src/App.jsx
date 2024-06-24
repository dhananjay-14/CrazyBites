import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  // console.log("backend url ", url)
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <hr></hr>
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/Add' element={<Add url={url}></Add>}></Route>
          <Route path='/List' element={<List url={url}></List>}></Route>
          <Route path='/Orders' element={<Orders url={url}></Orders>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App