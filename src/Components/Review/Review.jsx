import React, { useEffect, useState } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewCart from '../ReviewCart/ReviewCart';
import happyImg from '../../images/giphy.gif';
const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlace,setOrderPlace] = useState(false);
    const handelPlaceOrder = ()=>{
        setCart([]);
        setOrderPlace(true);
        clearLocalShoppingCart();
    }
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
    let tankYou;
    if(orderPlace)
    {
        tankYou = <img src={happyImg} alt="" />
    }
    
    return (
        <div className='shopContainer'>
           <div className="productContainer">
                {
                    cart.map(product => <ReviewItem product={product} key={product.key} removeHandeler={removeHandeler}></ReviewItem>)
                }
                {
                    tankYou
                }
           </div>
           <div className="reviewContainer">
                <ReviewCart cart={cart}>
                    <button className="addBtn" onClick={handelPlaceOrder}>Place Order</button>
                </ReviewCart>
            </div>
        </div>
    );
};

export default Review;