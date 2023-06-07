import React from 'react'
import Navbar from '../components/Navbar'
import ContactForm from '../components/ContactForm'
import { ContactDetailsWrapper, ContactItem, ContactWrapper } from '../assets/wrappers/ContactWrapper'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

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
            <ContactDetailsWrapper>
              <ContactItem>
                  <div className='icon'>
                      <FaPhone/>
                  </div>
                  <p>123-456-789</p>
              </ContactItem>
              <ContactItem>
                  <div className='icon'>
                      <FaEnvelope/>
                  </div>
                  <p>connectify@email.com</p>
              </ContactItem>
              <ContactItem>
                  <div className='icon'>
                      <FaMapMarkerAlt/>
                  </div>
                  <p>Manila, Philippines</p>
              </ContactItem>
          </ContactDetailsWrapper>
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