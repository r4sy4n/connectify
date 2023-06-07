import React from 'react'
import { useState, useReducer } from 'react'
import { ContactFormWrapper, Form, Button } from '../assets/wrappers/ContactWrapper';
import PopupMessage from './PopupMessage';

const initialState = {
  name: '',
  email: '',
  message: '',
  showPopup: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'SHOW_POPUP':
      return { ...state, showPopup: true };
    case 'HIDE_POPUP':
      return { ...state, showPopup: false };
    default:
      return state;
  }
};

const ContactForm = () => {
    const [state, dispatch] = useReducer( formReducer, initialState )

    const handleSubmit = ( event ) => {
      event.preventDefault();
      console.log('Submitted:', state.name, state.email, state.message);
  
      dispatch({ type: 'SET_NAME', payload: '' });
      dispatch({ type: 'SET_EMAIL', payload: '' });
      dispatch({ type: 'SET_MESSAGE', payload: '' });
      dispatch({ type: 'SHOW_POPUP' });
    };  

    const handleClose = () => {
      dispatch({ type: 'HIDE_POPUP' });
    };

  return (
    <ContactFormWrapper>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={ state.name } 
          onChange={( event ) => dispatch({ type: 'SET_NAME', payload: event.target.value })}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={ state.email }
          onChange={( event ) => dispatch({ type: 'SET_EMAIL', payload: event.target.value })}
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={ state.message }
          onChange={( event ) => dispatch({ type: 'SET_MESSAGE', payload: event.target.value })}
          required
        >
        </textarea>

        <Button type="submit">Send</Button>
      </Form>

      {state.showPopup && ( 
        <PopupMessage onClose={ handleClose }>
          <p>Thank you for contacting us!</p>
        </PopupMessage>
      )}
        
    </ContactFormWrapper>
  );
};

export default ContactForm