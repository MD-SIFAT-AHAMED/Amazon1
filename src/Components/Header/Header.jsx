import React, { useContext } from 'react';
import img from "././../../images/logo.png";
import "./Header.css";
import { Link } from 'react-router';
import { UserContext } from '../../App';
const Header = () => {
  const [loggedInUser,setLoggedInUser]= useContext(UserContext);
    return (
      
        <div className='HeaderContainer'>
          <h2>name: {loggedInUser.name}</h2>
          <h2>email: {loggedInUser.email}</h2>
           <div className='imgContainer'>
             <img className='imgHeader' src={img} alt="" />
           </div>
           <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={()=>setLoggedInUser({})}>Sign Out</button>
           </nav>
        </div>
    );
};

export default Header;