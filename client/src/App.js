import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const App = () => {

  return (
    <BrowserRouter>
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
        <Route path='catalog/:category' element={ <CategoryPage/> } />
        <Route path='*' element={ <ErrorPage/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;