import React from 'react'
import { useReducer } from 'react'
import { ContactFormWrapper, Form, Button } from '../assets/wrappers/ContactWrapper';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email: '',
  message: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
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

      toast.success('Message sent!');
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
    </ContactFormWrapper>
  );
};

export default ContactForm