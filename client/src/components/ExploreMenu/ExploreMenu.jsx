import React, { useContext, useState } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {


    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable variety of dishes</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (<div key={index} className='explore-menu-list-item' onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)}>
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>)
                })}
            </div>

        </div>
    )
}

export default ExploreMenu