import React, { useState } from 'react';
import "./Shop.css";
import fakeData from './../../fakeData/index';
import Cart from '../Cart/Cart';

import { addToDatabaseCart } from '../../utilities/fakedb';
import ReviewCart from '../ReviewCart/ReviewCart';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product,setProduct] = useState(first10);
    const [cart,setCart] = useState([]);

    const addProductHandler = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct)
        {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAddedKey );
            newCart = [...others,sameProduct]
        }
        else
        {
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    

    return (
        <div className='shopContainer'>
            <div className="productContainer">
                {
                    product.map(product => <Cart addToCartShow={false} product={product} addProductHandler={addProductHandler}></Cart>)
                }
            </div>
            <div className="reviewContainer">
                <ReviewCart cart={cart}></ReviewCart>
            </div>
        </div>
    );
};

export default Shop;