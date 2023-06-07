import React from 'react'
import Navbar from '../components/Navbar'
import ContactWrapper from '../assets/wrappers/ContactWrapper'
import ContactDetails from '../components/ContactDetails'
import ContactForm from '../components/ContactForm'

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <ContactWrapper>
        <div className='title-container'>
          <p>Get in touch</p>
          <h1>CONTACT US</h1>
        </div>
        <div className='contact-container'>
          <div className='contact-details'>
            <ContactDetails />
          </div>
          <div className='contact-border'></div>
          <div className='contact-form'>
            <ContactForm />
          </div>
        </div>
      </ContactWrapper>
    </div>
  )
}

export default ContactUs