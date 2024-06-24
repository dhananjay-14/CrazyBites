import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { Store } from '../../context/Store';
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ showLogin, setShowLogin }) => {
    const { jwt, setJwt, url } = useContext(Store);

    const [currState, setCurrState] = useState("Login");
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setUserDetails((userDetails) => ({ ...userDetails, [fieldName]: fieldValue }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let endpoint = url;
        if (currState == "Login") {
            endpoint = endpoint + "/api/user/login"
        }
        else {
            endpoint = endpoint + "/api/user/register"
        }
        const res = await axios.post(endpoint, userDetails);
        if (res.data.success) {
            console.log(res.data);
            setJwt(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false);
            toast.success(res.data.message)
            // alert(res.data.message)
        }
        else {
            toast.error(res.data.message);
            // alert("Invalid Credentials");
            console.log(res.data)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={submitHandler} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && <input name='name' type="text" placeholder='Enter your name' value={userDetails.name} onChange={(e) => onChangeHandler(e)} required />}
                    <input name='email' type="email" placeholder='Email' onChange={(e) => onChangeHandler(e)} value={userDetails.email} required />
                    <input name='password' type="password" placeholder='password' onChange={(e) => onChangeHandler(e)} value={userDetails.password} required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" ?
                    <p className='Login'>Create a new account <span onClick={() => setCurrState("Sign Up")}>here</span></p> :
                    <p className='Login'>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup