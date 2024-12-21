import React from 'react';

const ReviewItem = (props) => {
    const{name,quantity}=props.product;
    return (
        <div style={{margin:"20px"}}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <button className='addBtn'>Remove</button>
        </div>
    );
};

export default ReviewItem;