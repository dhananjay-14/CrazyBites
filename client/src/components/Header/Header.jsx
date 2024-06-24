import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Taste the Best</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.</p>
                <button><a href='#explore-menu'>View Menu</a></button>
            </div>
        </div>
    )
}

export default Header