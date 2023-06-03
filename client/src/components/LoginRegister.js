import React, { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import { ModalWrapper, LoginWrapper } from '../assets/wrappers/ModalWrapper';

const LoginRegister = ({ closeModal }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState();

    const initialStates = {
        email: '',
        password: '',
        errorMessage: {
            email: '',
            password: '',
            credentials: ''
        }
    }

    const reducer = (state, action) => {
        switch(action.type) {
            case 'ON_CHANGE':
                return {
                    ...state,
                    [action.state]: action.value,
                    errorMessage: {
                        ...state.errorMessage,
                        credentials: ''
                    }
                }

            case 'ERROR_MESSAGE':
                return {
                    ...state,
                    errorMessage: {
                        ...state.errorMessage,
                        [action.state]: action.value
                    }
                }

            default: 
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialStates)
  
  //hides the modal when clicked outside or the 'x' button
  const hideModal = (event) => {
      let modalContainer = document.querySelector('.modal-container');
      let modalClose = document.querySelector('.modal-close');
      
      if (modalContainer !== undefined) {
          if (!modalContainer.contains(event.target) || modalClose.contains(event.target)){
            closeModal();
          }
      }
  }

  const loginFormHandler = (event) => {
    event.preventDefault();

    if( !state.email ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'email', value: 'Email cannot be empty' })
    }

    if( !state.password ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'password', value: 'Password cannot be empty' })
    }

    if( state.email && state.password ) {

        setIsLoading(true)

        axios.post(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/auth/login`, { email: state.email, password: state.password }).then((dbResponse) => {

                localStorage.setItem('token', dbResponse.data.token)
                dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: '' })
                setIsLoading(false)

        })
        .catch(error => {
            dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: 'Email/Password is incorrect' })
            setIsLoading(false)
        })
    }
  }

  return (
    //modal's overlay container
    <ModalWrapper
    onClick={ hideModal }
>
    {/* Start Modal Main Container */}
    <div className='modal-container'>

        {/* Start Close Button */}
        <div className='modal-close'
            onClick={ hideModal }
        >
            <Icon><CloseCircleOutline/></Icon>
        </div>
        {/* End Close Button */}

        {
            isLoading
            ? <p> Loading </p>
            :
            <LoginWrapper>

                <div className='title'>
                    <h2> Log in</h2>
                </div>

                <form
                    className='loginForm'
                    onSubmit={ loginFormHandler }
                >
                    {/* EMAIL */}
                    <label htmlFor='email'>Email Address: </label>
                    <input
                        type='email'
                        id = 'email'
                        value = { state.email }
                        placeholder='Enter your email address'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />
                    { !state.email && <p>{ state.errorMessage.email }</p> }

                    {/* PASSWORD */}
                    <label htmlFor='email'>Password: </label>
                    <input
                        type='password'
                        id = 'password'
                        value = { state.password }
                        placeholder='Enter your password'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />
                    { !state.password && <p>{ state.errorMessage.password }</p> }
                    { !state.credentials && <p>{ state.errorMessage.credentials }</p> }

                    <div className='buttonContainer'>
                        <button
                            type='submit'
                            className='btn'
                        >
                            Login
                        </button>

                        <button
                            type='button'
                            className='btn'
                            onClick={() => navigate() }
                        >
                            Sign Up Free
                        </button>
                    </div>
                    
                </form>
            </LoginWrapper>
        
        }
    </div>
  </ModalWrapper>
  )
}

export default LoginRegister;