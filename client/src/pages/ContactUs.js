import React from 'react'
import Navbar from '../components/Navbar'
import ContactWrapper from '../assets/wrappers/Contact'

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <ContactWrapper>
        <div className='title-container'>
          <p>Get in touch</p>
          <h1>Contact Us</h1>
        </div>
        <div className='form-container'>
          
        </div>
      </ContactWrapper>
    </div>
  )
}

export default ContactUs