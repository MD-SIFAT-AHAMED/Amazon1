import React, { useEffect, useState } from 'react';
import "./Shop.css";
import fakeData from './../../fakeData/index';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb';
import ReviewCart from '../ReviewCart/ReviewCart';
import { Link } from 'react-router';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product,setProduct] = useState(first10);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd=> pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])

    const addProductHandler = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct)
        {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAddedKey);
            newCart = [...others,sameProduct];
        }
        else
        {
            product.quantity = 1;
            newCart =[...cart,product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count)
    }
    
    return (
        <div className='shopContainer'>
            <div className="productContainer">
                {
                    product.map(product => <Cart addToCartShow={false} key={product.key} product={product} addProductHandler={addProductHandler}></Cart>)
                }
            </div>
            <div className="reviewContainer">
                <ReviewCart cart={cart}>
                    <Link to="/review">
                        <button className="addBtn">Review</button>
                    </Link>
                </ReviewCart>
            </div>
        </div>
    );
};

export default Shop;