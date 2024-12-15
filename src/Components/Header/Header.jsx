import React from 'react';
import img from "././../../images/logo.png";
import "./Header.css";
const Header = () => {
    return (
        <div className='HeaderContainer'>
           <div className='imgContainer'>
             <img className='imgHeader' src={img} alt="" />
           </div>
           <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/inventory">Manage Inventory</a>
           </nav>
        </div>
    );
};

export default Header;