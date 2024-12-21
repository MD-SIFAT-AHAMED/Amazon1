import React, { useState } from 'react';
import "./Shop.css";
import fakeData from './../../fakeData/index';
import Cart from '../Cart/Cart';
import { Link } from 'react-router';
import { addToDatabaseCart } from '../../utilities/fakedb';
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product,setProduct] = useState(first10);
    const [cart,setCart] = useState([]);

    const addProductHandler = (product)=>{
        const newCart = [...cart,product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd=> pd.key===product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key,count);
    }
    const total = cart.reduce((total,item) =>total + item.price,0);
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
        <div className='shopContainer'>
            <div className="productContainer">
                {
                    product.map(product => <Cart addToCartShow={false} product={product} addProductHandler={addProductHandler}></Cart>)
                }
            </div>
            <div className="reviewContainer">
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
        </div>
    );
};

export default Shop;