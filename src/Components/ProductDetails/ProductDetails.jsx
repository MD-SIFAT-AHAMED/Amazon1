import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';

const ProductDetails = () => {
    const {producyKey}=useParams();
    const product =fakeData.find(pd=> pd.key===producyKey);
    // console.log(product);
    return (
        <div>
            <h1> {producyKey} Your Product details </h1>
            <Cart product={product} addToCartShow={true}></Cart>
        </div>
    );
};

export default ProductDetails;