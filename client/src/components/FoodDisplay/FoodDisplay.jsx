import React, { useContext, useEffect } from 'react'
import './FoodDisplay.css'
import { Store } from '../../context/Store';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, food_list }) => {
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}></FoodItem>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay