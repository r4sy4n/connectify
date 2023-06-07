import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import LoginRegister from './components/LoginRegister';

import {
    LandingPage, 
    ErrorPage, 
    ContactUs, 
    Catalog, 
    CategoryPage
} from './pages';

import {
    CheckOutPage,
    ProductList,
    SellerDashboard,
    SellerManageProducts,
    SellerProfile,
    Settings,
    SharedLayout,
    SupplierDashboard,
    SupplierManageProducts,
    SupplierProfile,
    WebsitePage
} from './pages/dashboard';

export const GlobalVariables = createContext();

const App = () => {

  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));

  useEffect(() => {
    if(isLoggedIn) {
      axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ isLoggedIn }`).then((userResponse) => {
        setCurrentUser(userResponse.data.user);
    });
    }
  },[])

  return (
    <BrowserRouter>
      <GlobalVariables.Provider value={{
        globalCurrentUser: currentUser,
        globalChangeCurrentUser: setCurrentUser
      }}>
        <Routes>
          <Route path='supplier' element={ <SharedLayout/> }>
            <Route index element={ <SupplierDashboard/> } />
            <Route path='manage' element={ <SupplierManageProducts/> } />
            <Route path='profile' element={ <SupplierProfile/> } />
          </Route>
          <Route path='seller' element={ <SharedLayout/> }>
            <Route index element={ <SellerDashboard/> } />
            <Route path='manage' element={ <SellerManageProducts/> } />
            <Route path='profile' element={ <SellerProfile/> } />
            <Route path=':usershopname' element={ <WebsitePage/> } />
            <Route path=':usershopname/productlist' element={ <ProductList/> } />
            <Route path=':usershopname/checkout' element={ <CheckOutPage/> } />
          </Route>
          <Route path='/' element={ <LandingPage/> } />
          <Route path='register' element={ <LoginRegister/> } />
          <Route path='contactus' element={ <ContactUs/> } />
          <Route path='catalog' element={ <Catalog/> } />
          <Route path='*' element={ <ErrorPage/> } />
        </Routes>
      </GlobalVariables.Provider>
    </BrowserRouter>
  )
}

export default App;