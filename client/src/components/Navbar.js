import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { Link, Outlet } from "react-router-dom";
import LogoBanner from "./LogoBanner";
import LoginRegister from "./LoginRegister";

const Navbar = () => {;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

  return (
    <>
    <Wrapper>
      <div className='nav-center'>
        <div className="navbar icon">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
            
          <div class="menu-items">
                <li><Link to='/'style={{ textDecoration: 'none' }}>Home</Link></li>
                <li><Link to='/catalog' style={{ textDecoration: 'none' }}>Catalog</Link></li>
                <li><Link to='/contactus' style={{ textDecoration: 'none' }}>Contact Us</Link></li>
          </div>
        </div>
      </div>
          <div>
            <LogoBanner/>
          </div>
            
          <div>
            <ul className="list">
                <li><Link to='/'style={{ textDecoration: 'none' }}>home</Link></li>
                <li><Link to='/catalog' style={{ textDecoration: 'none' }}>catalog</Link></li>
                <li><Link to='/contactus' style={{ textDecoration: 'none' }}>contact us</Link></li>
            </ul>
          </div>
          <div>
            <span  onClick={openModal}>Login | Sign Up Free</span>
          </div>
          {isModalOpen && <LoginRegister closeModal={closeModal} />}
      </div>
    </Wrapper>
    <Outlet />
    </>
  )
};

export default Navbar;