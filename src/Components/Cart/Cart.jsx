import React from 'react';
import "./Cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Cart = (props) => {
    const {name,img,price,seller,stock} =props.product;
    const addProductHandler= props.addProductHandler;

    return (
        <div className='cartContainer'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='pdName'>{name}</h4>
                <br />
                <p>By: {seller}</p>
                <br />
                <p>Price: {price}</p>
                <br />
                <p>Only {stock} left in stock - Order now</p>
                <br />
                <button onClick={()=>addProductHandler(props.product)} className='addBtn'><FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
            </div>
        </div>
    );
};

export default Cart;