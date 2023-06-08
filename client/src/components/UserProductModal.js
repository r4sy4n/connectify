import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import Loading from '../components/Loading'
import { utils } from '../utils/Utils'

import { ModalWrapper, UserProductWrapper } from '../assets/wrappers/ModalWrapper';

const UserProductModal = ({ closeModal, product }) => {

    const [isLoading, setIsLoading] = useState(true);

    const initialStates = {
        productName: product.name,
        productPrice: product.price,
        productDescription: product.description,
        productImage: [{}]
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

    const updateFormHandler = () => {

    }

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        //modal's overlay container
        <ModalWrapper
            onClick={ utils.hideModal(closeModal) }
        >
            {/* Start Modal Main Container */}
            <div className='modal-container'>

                {/* Start Close Button */}
                <div className='modal-close'
                    onClick={ utils.hideModal(closeModal) }
                >
                    <Icon><CloseCircleOutline/></Icon>
                </div>
                {/* End Close Button */}

                {
                    
                //checks if loading spinner should be display or the form
                isLoading
                ? <Loading center />
                :
                <UserProductWrapper>
                    
                    <form
                        onSubmit={ updateFormHandler }
                    >
                        <label htmlFor='productName' className='form-label' >Product Name: </label>
                        <input
                            type='text'
                            id='productName'
                            className='form-input'
                            value={ state.productName }
                            onChange= { (event) =>
                                dispatch({
                                    type: 'ON_CHANGE',
                                    state: event.target.id,
                                    value: event.target.value
                                })
                            }
                        />
                        <label htmlFor='productPrice' className='form-label' >Product Price: </label>
                        <input
                            type='number'
                            id='productPrice'
                            className='form-input'
                            value={ state.productPrice }
                            onChange= { (event) =>
                                dispatch({
                                    type: 'ON_CHANGE',
                                    state: event.target.id,
                                    value: event.target.value
                                })
                            }
                        />
                        <label htmlFor='productDescription' className='form-label' >Product Description: </label>
                        <input
                            type='text'
                            id='productDescription'
                            className='form-input'
                            value={ state.productDescription }
                            onChange= { (event) =>
                                dispatch({
                                    type: 'ON_CHANGE',
                                    state: event.target.id,
                                    value: event.target.value
                                })
                            }
                        />

                        <button
                            type='button'
                            className='btn'
                        >
                            Update
                        </button>
                    </form>
                        
                </UserProductWrapper>
                }
            </div>
        </ModalWrapper>
  )
}

export default UserProductModal;