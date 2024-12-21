import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProduct = productKey.map(key =>{
        const product = fakeData.find(pd=> pd.key === key);
        product.quantity = saveCart[key];
        return product;
       })
       setCart(cartProduct);
    },[])
    return (
        <div>
            <h1>Total Item :{cart.length}</h1>
            {
                cart.map(product => <ReviewItem product={product} key={product.key}></ReviewItem>)
            }
        </div>
    );
};

export default Review;