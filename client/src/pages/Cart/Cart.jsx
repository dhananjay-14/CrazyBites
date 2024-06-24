import React, { useContext } from 'react'
import './Cart.css'
import { Store } from '../../context/Store'
import { useNavigate } from 'react-router';
const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(Store);
    const navigate = useNavigate();
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {Object.keys(cartItems).length == 0 && <div className='emptymsg'>Your cart is Empty!</div>}
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>Rs {item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>Rs {cartItems[item._id] * item.price}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                                </div>
                                <hr />
                            </>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                    <button onClick={() => navigate('/placeorder')}>Proceed to checkout</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='promocode' />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart