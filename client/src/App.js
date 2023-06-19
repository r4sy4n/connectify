import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister';

import {
    LandingPage, 
    ErrorPage, 
    ContactUs, 
    Catalog, 
    CategoryPage,
    ProtectedRoute,
    ProductPage
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
        globalLoggedInUserId: loggedInUserId,
        globalChangeCurrentUser: setCurrentUser
      }}>
        <Routes>
          {
            // currentUser &&
            <Route path='dashboard' element={ 
              <ProtectedRoute>
                <SharedLayout/> 
              </ProtectedRoute>
            }>
              <Route index element={ <Dashboard/> } />
              <Route path='profile' element={ <Profile/> } />
              <Route path='orders' element={ <Orders/> } />
              <Route path='manage' element={ <ManageProducts/> } />
              <Route path=':usershopname' element={ currentUser && currentUser.Type === 'seller' ? <WebsitePage/> : <ErrorPage/> } />
              <Route path=':usershopname/productlist' element={ currentUser && currentUser.Type === 'seller' ? <ProductList/> : <ErrorPage/> } />
              <Route path=':usershopname/checkout' element={ currentUser && currentUser.Type === 'seller' ? <CheckOutPage/> : <ErrorPage/> } />
            </Route>
          }
          <Route path='/' element={ <Navbar/> } >
            <Route index element={ <LandingPage/> } />
            <Route path='register' element={ <LoginRegister/> } />
            <Route path='contactus' element={ <ContactUs/> } />
            <Route path='catalog' element={ <Catalog/> } />
            <Route path='catalog/:category' element={ <CategoryPage/> } />
            <Route path='catalog/:category/:productId' element={ <ProductPage/> } />
            <Route path='*' element={ <ErrorPage/> } />
          </Route>
        </Routes>
      </GlobalVariables.Provider>
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  )
}

export default App;