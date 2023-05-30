import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    LoginRegister, 
    LandingPage, 
    ErrorPage, 
    ContactUs, 
    Catalog 
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
          <Route path='suppliermanageproducts' element={ <SupplierManageProducts/> } />
          <Route path='supplierprofile' element={ <SupplierProfile/> } />
        </Route>
        <Route path='seller' element={ <SharedLayout/> }>
          <Route index element={ <SellerDashboard/> } />
          <Route path='sellermanageproducts' element={ <SellerManageProducts/> } />
          <Route path='sellerprofile' element={ <SellerProfile/> } />
          <Route path='webpage' element={ <WebsitePage/> } />
          <Route path='webpage/productlist' element={ <ProductList/> } />
          <Route path='webpage/checkout' element={ <CheckOutPage/> } />
        </Route>
        <Route path='/' element={ <LandingPage/> } />
        <Route path='register' element={ <LoginRegister/> } />
        <Route path='contactus' element={ <ContactUs/> } />
        <Route path='catalog' element={ <Catalog/> } />
        <Route path='*' element={ <ErrorPage/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;