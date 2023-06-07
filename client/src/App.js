import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    Dashboard,
    ManageProducts,
    Profile,
    SharedLayout,
    WebsitePage,
    Orders,
} from './pages/dashboard';

export const GlobalVariables = createContext();

const App = () => {

  const [currentUser, setCurrentUser] = useState();
  const [loggedInUserId, setLoggedInUserId] = useState(localStorage.getItem('user'));
  const [currentUserType, setCurrentUserType] = useState();

  useEffect(() => {
    if(loggedInUserId) {
      axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ loggedInUserId }`).then((userResponse) => {
        setCurrentUser(userResponse.data.user);
        setCurrentUserType(userResponse.data.user.userType)
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
          <Route path='dashboard' element={ <SharedLayout/> }>
            <Route index element={ <Dashboard/> } />
            <Route path='profile' element={ <Profile/> } />
            <Route path='orders' element={ <Orders/> } />
            <Route path='manage' element={ <ManageProducts/> } />
            <Route path=':usershopname' element={ currentUserType === 'seller' ? <WebsitePage/> : <ErrorPage/> } />
            <Route path=':usershopname/productlist' element={ currentUserType === 'seller' ? <ProductList/> : <ErrorPage/> } />
            <Route path=':usershopname/checkout' element={ currentUserType === 'seller' ? <CheckOutPage/> : <ErrorPage/> } />
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