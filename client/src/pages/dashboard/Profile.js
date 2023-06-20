import React, { useState, useEffect, useContext, useReducer } from 'react'
import Wrapper from '../../assets/wrappers/Profile';
import { useNavigate } from 'react-router';
import { GlobalVariables } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { SharedLayoutContext } from './SharedLayout';

const Profile = () => {
    const { globalCurrentUser, globalLoggedInUserId, globalChangeCurrentUser } = useContext( GlobalVariables );
    const {showSidebar} = useContext(SharedLayoutContext);

    const [isLoading, setIsLoading] = useState(false);

    const initialStates = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      shopName: '',
      phone: '',
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

    const saveChangesHandler = (event) => {
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

    //error when shopname is blank
    if( !state.shopName ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'shopName', value: 'Business Name cannot be empty' });
    }

    //error when phone is blank
    if( !state.phone ) {
        dispatch({ type: 'ERROR_MESSAGE', state: 'phone', value: 'Contact Number cannot be empty' });
    }

    //checks if all fields are not empty
    if( state.firstName && state.lastName && state.email && state.shopName && state.phone ) {

        setIsLoading(true) //display the loading spinner

        //add the user to the database
        axios.put(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalCurrentUser._id }`, {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          shopName: state.shopName,
          phone: state.phone,
        }).then((dbResponse) => {

                dispatch({ type: 'ERROR_MESSAGE', state: 'credentials', value: '' });
                setIsLoading(false);
                console.log(dbResponse)
                toast.success('Edit Successfully');

        })
        .catch(error => {
            toast.error('Save Failed');
            setIsLoading(false);
            console.log(error)
        })
    }
  }

  useEffect(() => {
    setIsLoading(true);

    globalLoggedInUserId &&
    axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }`).then((userResponse) => {
        globalChangeCurrentUser(userResponse.data.user);

        //set info from database as the value of states
        Object.keys(state).map(states => {
            dispatch({type: 'ON_CHANGE', state: states, value: userResponse.data.user[ states ]})
        })
        setIsLoading(false);
    });
  },[])

  return (
    <Wrapper>
      {    
    isLoading
        ? <Loading center />
        :
    <form className={showSidebar ? 'form' : 'form-move'}>
                <h2>Edit Profile</h2>  
                    {/* Personal Information */}
                    <label className='form-label'>Edit Information: </label>
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

                    {/* Business Information */}
                    <label className='form-label'>Edit Business Information: </label>
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
                    
                    </form>
}
                    <br/>

                    <div className='buttonContainer'>
                        <button
                            type='button'
                            className='btn'
                            onClick={ saveChangesHandler }
                        >
                            Save Changes
                        </button>
                    </div>
    </Wrapper>
  )
}

export default Profile;