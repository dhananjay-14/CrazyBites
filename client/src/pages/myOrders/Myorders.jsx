import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { Store } from '../../context/Store';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = ({ setShowLogin }) => {
    const [orders, setOrders] = useState([]);
    const { url, jwt } = useContext(Store);
    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token: jwt } });
        console.log(response.data)
        setOrders(response.data.data.reverse());
    }


    useEffect(() => {
        if (jwt) {
            fetchOrders().then(() => console.log(orders));
        }
    }, [jwt])
    return (
        <>
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="container">
                    {orders.map((order, index) => {
                        return <div className='my-orders-order'>
                            <img className='icon' src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + ' x ' + item.quantity + ', '
                                }
                            })}</p>
                            <p>Rs. {order.amount}</p>
                            <p>Items : {order.items.length}</p>
                            {/* <p><span>&#x25cf;</span> <b>{order.status}</b></p> */}
                            <p><img className='order-status' src="https://cdn-icons-png.freepik.com/512/6735/6735447.png" alt="" /> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Myorders