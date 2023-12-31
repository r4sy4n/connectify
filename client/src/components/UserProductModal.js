import React, { useState, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import Loading from '../components/Loading'
import { utils } from '../utils/Utils'

import { ModalWrapper, UserProductWrapper } from '../assets/wrappers/ModalWrapper';
import { GlobalVariables } from '../App';

const UserProductModal = ({ closeModal, product }) => {
    
    const { globalCurrentUser, globalLoggedInUserId } = useContext( GlobalVariables )

    const [isLoading, setIsLoading] = useState(true);

    const initialStates = {
        productName: product.productName ? product.productName : product.productId.name,
        productPrice: product.productPrice ? product.productPrice : product.productId.price,
        productDescription: product.productDescription ? product.productDescription : product.productId.description,
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

    const updateFormHandler = (event) => {
        event.preventDefault();

        
        setIsLoading(true) //display the loading spinner
        
        //save changes to the database
        axios.put(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalCurrentUser._id }/${ product.productId._id }`, {
            productName: state.productName,
            productPrice: state.productPrice,
            productDescription: state.productDescription
          })
          .then((dbResponse) => {
            closeModal();
            setIsLoading(false);
            toast.success('Saved Successfully');
  
          })
          .catch(error => {
              toast.error('Save Failed');
              setIsLoading(false);
              console.log(error)
          })
    }

    const removeProduct = (product) => {
        
        return () => {
            console.log(product)
            setIsLoading(true) //display the loading spinner
            
            //delete the product in the user's product list
            axios.put(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalCurrentUser._id }/product-list`, {
                type: 'remove',
                product: product
            })
            .then((dbResponse) => {
                closeModal();
                setIsLoading(false);
                toast.success('Product Deleted');
    
            })
            .catch(error => {
                toast.error('Failed to Delete');
                setIsLoading(false);
                console.log(error)
            })
        }
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

                        <div className='buttonContainer'>
                            <button
                                type='submit'
                                className='btn'
                            >
                                Update
                            </button>

                            <button
                                type='button'
                                className='btn'
                                onClick={ removeProduct(product.productId) }
                            >
                                Remove
                            </button>
                        </div>
                    </form>
                        
                </UserProductWrapper>
                }
            </div>
        </ModalWrapper>
  )
}

export default UserProductModal;