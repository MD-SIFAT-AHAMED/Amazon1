import React, { createContext, useState } from 'react';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
export const UserContext = createContext();
const App = () => {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <Header/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/shipment' element={<Shipment/>}></Route>
          <Route exact path="/" element={<Shop/>}/>
          <Route path="/product/:producyKey" element={<ProductDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;