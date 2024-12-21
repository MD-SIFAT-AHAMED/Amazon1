import React from 'react';
import { Link } from 'react-router';
const ReviewCart = (props) => {
    const cart  = props.cart;
    const total = cart.reduce((total,item) =>total + item.price * item.quantity,0);
    let shipping =0;
    if(total > 35)
    {
        shipping = 0;
    }
    else if(total > 12)
    {
        shipping = 6;
    }
    else if(total > 0)
    {
        shipping =12.22;
    }
    const tax =  (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num=>{
        const precistion = num.toFixed(2);
        return Number(precistion);
    }
    return (
        <div>
            
            <h3>Order Review</h3>
            <h4>Total Item: {cart.length}</h4>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping cost: {shipping}</p>
            <p>Tax + vat: {tax}</p>
            <h4>Toatl Price: {grandTotal}</h4>
            <Link to="/review">
                <button className="addBtn">Review</button>
            </Link>
            
        </div>
    );
};

export default ReviewCart;