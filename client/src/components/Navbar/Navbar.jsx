import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../context/Store';
const Navbar = ({ showLogin, setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const navigate = useNavigate();
    const { getTotalCartAmount, jwt, setJwt } = useContext(Store);
    const logout = () => {
        localStorage.removeItem("token");
        setJwt("");
        navigate('/');
        console.log("logged out")
    }
    return (
        <div className='navbar'>
            {/* <img src="/Crazy_Bites-Food_Truck.png" alt="" className='logo' /> */}
            <Link to="/"><img src="/newlogo.avif" alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to="/"><li onClick={() => setMenu("Home")} className={menu == "Home" ? "active" : ""} >Home</li></Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu == "Menu" ? "active" : ""} >Menu</a>
                <a href='#food-display' onClick={() => setMenu("Top Dishes")} className={menu == "Top Dishes" ? "active" : ""}>Top Dishes</a>
                <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu == "Contact Us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                </div>
                {!jwt ? <button onClick={() => setShowLogin(!showLogin)}>Sign In</button> :
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <Link to='/myorders'><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
                            <hr />
                            <li onClick={() => logout()}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar