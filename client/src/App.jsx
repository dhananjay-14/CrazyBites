import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Footer from './components/Footer/Footer'
import Verify from './pages/Verify/Verify'
import Myorders from './pages/myOrders/Myorders'


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup showLogin={showLogin} setShowLogin={setShowLogin}></LoginPopup> : <></>}
      <div className='app'>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder setShowLogin={setShowLogin} />} />
          <Route path='/verify' element={<Verify></Verify>} />
          <Route path='/myorders' element={<Myorders setShowLogin={setShowLogin}></Myorders>} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App