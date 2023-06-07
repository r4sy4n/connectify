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
          <h1>Get in touch</h1>
          <p>Want to get in touch? We'd love to hear from you!</p>
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