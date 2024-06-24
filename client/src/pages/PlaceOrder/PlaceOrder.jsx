import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { Store } from '../../context/Store'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const PlaceOrder = ({ setShowLogin }) => {
    const { getTotalCartAmount, cartItems, food_list, url, jwt } = useContext(Store);
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const value = e.target.value;
        setData(data => ({ ...data, [e.target.name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(data);
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let orderItem = item;
                orderItem.quantity = cartItems[item._id];
                orderItems.push(orderItem);
            }
        })
        console.log(orderItems);
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 10
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token: jwt } });
        console.log(response.data);
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            toast.error(response.data.message);
            setShowLogin(true);
        }
    }
    return (
        <>
            <ToastContainer></ToastContainer>
            <form className='place-order' onSubmit={onSubmitHandler}>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-fields">
                        <input required type="text" placeholder='first name' name='firstname' value={data.firstname} onChange={onChangeHandler} />
                        <input required type="text" placeholder='last name' name='lastname' value={data.lastname} onChange={onChangeHandler} />
                    </div>
                    <input required type="email" placeholder='email address' name='email' value={data.email} onChange={onChangeHandler} />
                    <input required type="text" placeholder='Street' name='street' value={data.street} onChange={onChangeHandler} />
                    <div className="multi-fields">
                        <input required type="text" placeholder='City' name='city' value={data.city} onChange={onChangeHandler} />
                        <input required type="text" placeholder='State' name='state' value={data.state} onChange={onChangeHandler} />
                    </div>
                    <div className="multi-fields">
                        <input required type="text" placeholder='Pin Code' name='zipcode' value={data.zipcode} onChange={onChangeHandler} />
                        <input required type="text" placeholder='Country' name='country' value={data.country} onChange={onChangeHandler} />
                    </div>
                    <input required type="text" placeholder='Phone' name='phone' value={data.phone} onChange={onChangeHandler} />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Summary</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>Rs {getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>Rs {10}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total  </b>
                                <b>Rs {getTotalCartAmount() + 10}</b>
                            </div>
                        </div>
                        <button type='submit'>Proceed to payment</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PlaceOrder