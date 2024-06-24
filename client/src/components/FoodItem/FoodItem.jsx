import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { Store } from '../../context/Store'

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(Store);
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-img" src={url + "/images/" + image} alt="" />
                {
                    // !itemCount ? <img className='add' onClick={() => setItemCount((prev) => prev + 1)} src={assets.add_icon_white}></img> :
                    !cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src='./download.jpeg'></img> :
                        <div className='food-item-counter'>
                            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)}></img>
                            <p>{cartItems[id]}</p>
                            <img src={assets.add_icon_green} onClick={() => addToCart(id)}></img>
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">Rs {price}</p>
            </div>
        </div>
    )
}

export default FoodItem