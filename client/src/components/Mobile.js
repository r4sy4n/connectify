import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Mobile';
import { Link } from "react-router-dom";

const Mobile = () => {


  return (
      <Wrapper>    
          <div className='mobile-nav'>
              <nav>
              <ul className='mobile-nav__menu'>
                <li><Link to='/'style={{ textDecoration: 'none' }}>home</Link></li>
                <li><Link to='/catalog' style={{ textDecoration: 'none' }}>catalog</Link></li>
                <li><Link to='/contactus' style={{ textDecoration: 'none' }}>contact us</Link></li>
              </ul>
              </nav>
          </div>
      </Wrapper>
  )
}

export default Mobile;