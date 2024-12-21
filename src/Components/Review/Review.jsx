import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewCart from '../ReviewCart/ReviewCart';

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
    const removeHandeler =(productKey)=>{
        const newCart = cart.filter(pd=> pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    return (
        <div className='shopContainer'>
           <div className="productContainer">
                {
                    cart.map(product => <ReviewItem product={product} key={product.key} removeHandeler={removeHandeler}></ReviewItem>)
                }
           </div>
           <div className="reviewContainer">
                <ReviewCart cart={cart}></ReviewCart>
            </div>
        </div>
    );
};

export default Review;