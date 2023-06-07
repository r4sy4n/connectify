import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import LoginRegister from './components/LoginRegister';
import Navbar from './components/Navbar';

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
    WebsitePage,
    SellerOrders,
    SupplierOrders
} from './pages/dashboard';

export const GlobalVariables = createContext();

const App = () => {

  const [currentUser, setCurrentUser] = useState();
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('user'));

  useEffect(() => {
    if(loggedInUserId) {
      axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ loggedInUserId }`).then((userResponse) => {
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
            <Route path='orders' element={ <SupplierOrders/> } />
          </Route>
          <Route path='seller' element={ <SharedLayout/> }>
            <Route index element={ <SellerDashboard/> } />
            <Route path='manage' element={ <SellerManageProducts/> } />
            <Route path='profile' element={ <SellerProfile/> } />
            <Route path='orders' element={ <SellerOrders/> } />
            <Route path=':usershopname' element={ <WebsitePage/> } />
            <Route path=':usershopname/productlist' element={ <ProductList/> } />
            <Route path=':usershopname/checkout' element={ <CheckOutPage/> } />
          </Route>

          <Route path='/' element={ <Navbar/> } >
            <Route index element={ <LandingPage/> } />
            <Route path='contactus' element={ <ContactUs/> } />
            <Route path='catalog' element={ <Catalog/> } />
            <Route path='catalog/:category' element={ <CategoryPage/> } />
            <Route path='*' element={ <ErrorPage/> } />
          </Route>
        </Routes>
      </GlobalVariables.Provider>
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  )
}

export default App;