import React from 'react';
import ReviewCart from '../ReviewCart/ReviewCart';

const ReviewItem = (props) => {
    const{name,quantity,key,price}=props.product;
    return (
        <div>
            <div style={{margin:"20px"}}>
                <h4>{name}</h4>
                <p><small>${price}</small></p>
                <p>Quantity: {quantity}</p>
                <button 
                className='addBtn'
                onClick={()=>props.removeHandeler(key)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;