import React from 'react'
import { FooterContent, FooterWrapper } from '../assets/wrappers/FooterWrapper'
import LogoBanner from '../components/LogoBanner'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <LogoBanner />
        <p>
          A smart and intuitive marketplace app that 
          connects buyers, sellers, and suppliers, enabling them
          to form valuable connections and secure lucrative deals.
        </p>
        <p className='copyright'>
          &copy; {currentYear} Connectify. All rights reserved.
        </p>
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer