import React from 'react';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import { BrowserRouter, Routes, Route } from "react-router";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
const App = () => {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route exact path="/" element={<Shop/>}/>
          <Route path="/product/:producyKey" element={<ProductDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;