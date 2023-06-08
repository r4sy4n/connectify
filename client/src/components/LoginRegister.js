import React, { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import Loading from '../components/Loading'
import { GlobalVariables } from '../App';

import { ModalWrapper, LoginWrapper, RegisterWrapper } from '../assets/wrappers/ModalWrapper';

const LoginRegister = ({ closeModal }) => {
    const { globalChangeCurrentUser } = useContext( GlobalVariables );

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

  //toggles between login and register form
  const formToggle = () => {
    setIsLogin(!isLogin);
    dispatch({ type: 'RESET' });
  }

  //login form submitted
  const loginFormHandler = (event) => {
    event.preventDefault();

    //error when email is blank
    if( !state.email ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'email', value: 'Email cannot be empty' });
    }

    //error when password is blank
    if( !state.password ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'password', value: 'Password cannot be empty' });
    }

    //check if email and password fields has value
    if( state.email && state.password ) {

        setIsLoading(true) //display the loading spinner

        //check the email/password combination if it exists in the database
        axios.post(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/auth/login`, { email: state.email, password: state.password }).then((dbResponse) => {
            
            //get the logged in user's information from database
            axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ dbResponse.data.userDetails.id }`).then((userResponse) => {

                localStorage.setItem('token', dbResponse.data.token);
                localStorage.setItem('user', dbResponse.data.userDetails.id);

                dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: '' });
                    setTimeout(() =>{
                        navigate('/dashboard');  
                    }, 600);
                toast.success('Login Successful!')

                globalChangeCurrentUser(userResponse.data.user);
            });

        })
        .catch(error => {
            dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: 'Email/Password is incorrect' });
            setIsLoading(false);
        })
    }
  }

  //register form submitted
  const registerFormHandler = (event) => {
    event.preventDefault();

    //error when firstname is blank
    if( !state.firstName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'firstName', value: 'First Name cannot be empty' });
    }

    //error when lastname is blank
    if( !state.lastName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'lastName', value: 'Last Name cannot be empty' });
    }

    //error when email is blank
    if( !state.email ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'email', value: 'Email cannot be empty' });
    }

    //error when password is blank
    if( !state.password ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'password', value: 'Password cannot be empty' });
    }
    else if (state.password !== state.confirmPassword) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'confirmPassword', value: 'Password and Confirm Password does not match' });
    }

    //error when shopname is blank
    if( !state.shopName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'shopName', value: 'Business Name cannot be empty' });
    }

    //error when phone is blank
    if( !state.phone ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'phone', value: 'Contact Number cannot be empty' });
    }

    //checks if all fields are not empty
    if( state.firstName && state.lastName && state.email && state.password && state.shopName && state.phone ) {

        setIsLoading(true) //display the loading spinner

        //add the user to the database
        axios.post(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/auth/register`, {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          shopName: state.shopName,
          phone: state.phone,
          userType: state.userType
        }).then((dbResponse) => {

                dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: '' });
                setIsLoading(false);

                toast.success('Successfully Created. Please Login');
                formToggle();

        })
        .catch(error => {
            dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: 'Email already Taken' });
            setIsLoading(false);
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
            
         //checks if loading spinner should be display or the form
          isLoading
          ? <Loading center />
          :
            isLogin
            ?
            <LoginWrapper>

                <div className='title'>
                    <h2> Log in</h2>
                </div>

                <form
                    onSubmit={ loginFormHandler }
                >
                    {/* EMAIL */}
                    <label htmlFor='email' className='form-label' >Email Address: </label>
                    <input
                        type='email'
                        id = 'email'
                        className='form-input'
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
                    <label htmlFor='password' className='form-label'>Password: </label>
                    <input
                        type='password'
                        id = 'password'
                        className='form-input'
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
                    <label className='form-label'>Personal Information: </label>
                    <input
                        type='text'
                        id = 'firstName'
                        className='form-input'
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
                        className='form-input'
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
                        className='form-input'
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
                        className='form-input'
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
                        className='form-input'
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
                    <label className='form-label'>Business Information: </label>
                    <input
                        type='text'
                        id = 'shopName'
                        className='form-input'
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
                        className='form-input'
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
                        className='form-select'
                        onChange={(event) =>
                            dispatch({
                            type: 'ON_CHANGE',
                            state: event.target.id,
                            value: event.target.value
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