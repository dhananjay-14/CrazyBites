import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import axios from 'axios'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Store } from '../../context/Store';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


const Verify = () => {
    const [param, setParam] = useSearchParams();
    const { url } = useContext(Store);
    const [paySuccess, setPaySuccess] = useState(false);
    const success = param.get("success");
    const orderId = param.get("orderId");
    const navigate = useNavigate();
    console.log(success, orderId)

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            console.log(response.data);
            setPaySuccess(true);
            toast.success("Order Placed!");
        }
        else {
            toast.error("Payment failed!");
            navigate('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <div className='verify'>
            <ToastContainer></ToastContainer>
            {
                !paySuccess ? <div className="spinner">
                </div> : <div className='success'>
                    <img src={"https://cdn.dribbble.com/users/2185205/screenshots/7886140/02-lottie-tick-01-instant-2.gif"} alt="" />
                    <h1>Order Placed Successfully!</h1>
                    <Link to='/'><button>Go to Home</button></Link>
                </div>
            }
        </div>
    )
}

export default Verify