import React from 'react'
import { useState } from 'react'
import { ContactFormWrapper, Form, Button } from '../assets/wrappers/ContactFormWrapper';
import PopupMessage from './PopupMessage';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = ( event ) => {
        event.preventDefault();
        console.log( 'Submitted:', name, email, message );

        setName('');
        setEmail('');
        setMessage('');

        setShowPopup( true );
        // todo
    };  

    const handleClose = () => {
      setShowPopup( false );
    }

  return (
    <ContactFormWrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ name } 
          placeholder="Enter your name"
          onChange={( event ) => setName( event.target.value )}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter your email address"
          onChange={( event ) => setEmail( event.target.value )}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={ message }
          placeholder="Enter your message"
          onChange={( event ) => setMessage( event.target.value )}
          required
        >
        </textarea>

        <Button type="submit">Submit</Button>
      </Form>

      {showPopup && ( 
        <PopupMessage onClose={ handleClose }>
          <p>Thank you for contacting us!</p>
        </PopupMessage>
      )}
        
    </ContactFormWrapper>
  );
};

export default ContactForm