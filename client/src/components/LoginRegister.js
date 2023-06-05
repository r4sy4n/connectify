import React, { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import { ModalWrapper, LoginWrapper, RegisterWrapper } from '../assets/wrappers/ModalWrapper';

const LoginRegister = ({ closeModal }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState();
    const [isLogin, setIsLogin] = useState(true);

    const initialStates = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      shopName: '',
      phone: '',
      userType: 'seller',
      errorMessage: {
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

            case 'RESET':
            return initialStates;

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

  const formToggle = () => {
    setIsLogin(!isLogin);
    dispatch({ type: 'RESET' });
  }

  const loginFormHandler = (event) => {
    event.preventDefault();

    if( !state.email ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'email', value: 'Email cannot be empty' });
    }

    if( !state.password ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'password', value: 'Password cannot be empty' });
    }

    if( state.email && state.password ) {

        setIsLoading(true)

        axios.post(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/auth/login`, { email: state.email, password: state.password }).then((dbResponse) => {

                localStorage.setItem('token', dbResponse.data.token);
                dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: '' });
                setIsLoading(false);    
                navigate(`/${ dbResponse.data.userDetails.userType }`);

        })
        .catch(error => {
            dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: 'Email/Password is incorrect' });
            setIsLoading(false);
        })
    }
  }

  const registerFormHandler = (event) => {
    event.preventDefault();

    if( !state.firstName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'firstName', value: 'First Name cannot be empty' });
    }

    if( !state.lastName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'lastName', value: 'Last Name cannot be empty' });
    }

    if( !state.email ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'email', value: 'Email cannot be empty' });
    }

    if( !state.password ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'password', value: 'Password cannot be empty' });
    }
    else if (state.password !== state.confirmPassword) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'confirmPassword', value: 'Password and Confirm Password does not match' });
    }

    if( !state.shopName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'shopName', value: 'Business Name cannot be empty' });
    }

    if( !state.phone ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'phone', value: 'Contact Number cannot be empty' });
    }

    if( state.firstName && state.lastName && state.email && state.password && state.shopName && state.phone ) {

        setIsLoading(true)

      
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
          isLogin
          ?
            isLoading
            ? <p> Loading </p>
            :
            <LoginWrapper>

                <div className='title'>
                    <h2> Log in</h2>
                </div>

                <form
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
                    
                    { !state.email && state.errorMessage.email ? <p className='error-message'>{ state.errorMessage.email }</p> : null }

                    {/* PASSWORD */}
                    <label htmlFor='password'>Password: </label>
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

                    { !state.password && state.errorMessage.password ? <p className='error-message'>{ state.errorMessage.password }</p> : null }
                    { !state.credentials && state.errorMessage.credentials ? <p className='error-message'>{ state.errorMessage.credentials }</p> : null }

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
                            onClick={ formToggle }
                        >
                            Sign Up Free
                        </button>
                    </div>
                    
                </form>
            </LoginWrapper>
            :
            <RegisterWrapper>

                <div className='title'>
                    <h2> Register</h2>
                </div>

                <form
                    onSubmit={ loginFormHandler }
                >
                    {/* Personal Information */}
                    <label>Personal Information: </label>
                    <input
                        type='text'
                        id = 'firstName'
                        value = { state.firstName }
                        placeholder='First Name'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />

                    { !state.firstName && state.errorMessage.firstName ? <p className='error-message'>{ state.errorMessage.firstName }</p> : null }

                    <input
                        type='text'
                        id = 'lastName'
                        value = { state.lastName }
                        placeholder='Last Name'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />

                    { !state.lastName && state.errorMessage.lastName ? <p className='error-message'>{ state.errorMessage.lastName }</p> : null }

                    <input
                        type='email'
                        id = 'email'
                        value = { state.email }
                        placeholder='Email'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />
                    
                    { !state.email && state.errorMessage.email ? <p className='error-message'>{ state.errorMessage.email }</p> : null }

                    <input
                        type='password'
                        id = 'password'
                        value = { state.password }
                        placeholder='Password'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />

                    { !state.password && state.errorMessage.password ? <p className='error-message'>{ state.errorMessage.password }</p> : null }

                    <input
                        type='password'
                        id = 'confirmPassword'
                        value = { state.confirmPassword }
                        placeholder='Confirm Password'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />

                    { !state.confirmPassword && state.errorMessage.confirmPassword ? <p className='error-message'>{ state.errorMessage.confirmPassword }</p> : null }

                    {/* Business Information */}
                    <label>Business Information: </label>
                    <input
                        type='text'
                        id = 'shopName'
                        value = { state.shopName }
                        placeholder='Business Name'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />
                    
                    { !state.shopName && state.errorMessage.shopName ? <p className='error-message'>{ state.errorMessage.shopName }</p> : null }

                    <input
                        type='phone'
                        id = 'phone'
                        value = { state.phone }
                        placeholder='Contact Number'
                        onChange= { (event) =>
                            dispatch({
                                type: 'ON_CHANGE',
                                state: event.target.id,
                                value: event.target.value
                            })
                        }
                    />
                    
                    { !state.phone && state.errorMessage.phone ? <p className='error-message'>{ state.errorMessage.phone }</p> : null }

                    <select
                    id='userType'
                    value={state.userType}
                    onChange={(event) => dispatch({
                        type: 'ON_CHANGE',
                        payload: {
                            state: event.target.id,
                            value: event.target.value
                        }
                    })}
                    >
                      <option value='seller'>Seller</option>
                      <option value='supplier'>Supplier</option>
                    </select>
                    
                    { !state.credentials && state.errorMessage.credentials ? <p className='error-message'>{ state.errorMessage.credentials }</p> : null }
                    
                    </form>

                    <br/>

                    <p>By Clicking "Sign Up", you accept the Connectify <span>Terms and Conditions</span></p>

                    <div className='buttonContainer'>
                        <button
                            type='button'
                            className='btn'
                            onClick={ registerFormHandler }
                        >
                            Sign Up
                        </button>
                    </div>

                    <br/>

                    <div className='already_member'>
                      <p>Already have a Connectify Account? <span className='login-text' onClick={ formToggle }>Log In!</span></p>
                    </div>
            </RegisterWrapper>
        
        }
    </div>
  </ModalWrapper>
  )
}

export default LoginRegister;