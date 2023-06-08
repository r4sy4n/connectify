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
          <LogoBanner/>
          <div>
            <ul>
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