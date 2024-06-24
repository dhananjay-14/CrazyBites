import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';



const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/getorders");
        if (response.data.success) {
            setOrders(response.data.data.reverse());
            console.log(response.data.data);
        }
        else {
            console.log("Failed to fetch orders");
            toast.error("Failed to fetch orders");
        }
    }

    const statusHandler = async (e, orderId) => {
        const response = await axios.post(url + "/api/order/updatestatus", {
            orderId: orderId,
            status: e.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
            toast.success("Order status updated successfully");
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, [])
    return (
        <div className='order add'>
            <h3>All Orders</h3>
            <div className="order-list">
                {
                    orders.map((order, index) => {
                        return <div key={index} className='order-item'>
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className='order-item-food'>
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className='order-item-name'>
                                    {order.address.firstname + " " + order.address.lastname}
                                </p>
                                <div className="order-item-address">
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                </div>
                                <p className='order-item-phone'>{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>Rs. {order.amount}</p>
                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Deliverd">Delivered</option>
                            </select>
                        </div>
                    })}
            </div>
        </div>
    )
}

export default Orders