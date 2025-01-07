import React from 'react';
import img from "././../../images/logo.png";
import "./Header.css";
import { Link } from 'react-router';
const Header = () => {
    return (
        <div className='HeaderContainer'>
           <div className='imgContainer'>
             <img className='imgHeader' src={img} alt="" />
           </div>
           <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
           </nav>
        </div>
    );
};

export default Header;