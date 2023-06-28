import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { GlobalVariables } from '../App';

import Loading from './Loading';

import { ModalWrapper } from '../assets/wrappers/ModalWrapper';

import { UserProductWrapper } from '../assets/wrappers/ModalWrapper';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

const AddProductModal = ({ closeModal, setProductList }) => {
  const { globalLoggedInUserId } = useContext( GlobalVariables )

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addProductHandler = (event) => {
    event.preventDefault();

    setIsLoading(true)

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/products`, {
        name: productName,
        price: productPrice,
        description: productDescription,
        stock: productStock,
        catalog: productCategory
      })
      .then((response) => {
        axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${ globalLoggedInUserId }/product-list`, { type: 'add', product: response.data.product }).then(userResponse => {
          toast.success('Product added successfully.');
          setIsLoading(false)
        })

        closeModal();
      })
      .catch((error) => {
        toast.error('Failed to add product.');
        setIsLoading(false)
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <ModalWrapper>
      <div className='modal-container'>
        <div className='modal-close' onClick={closeModal}>
          <Icon>
            <CloseCircleOutline />
          </Icon>
        </div>

        {isLoading ? (
          <Loading center />
        ) : (
          <UserProductWrapper>
            <form onSubmit={addProductHandler}>
              <label htmlFor='productName' className='form-label'>
                Name:
              </label>
              <input
                type='text'
                id='productName'
                className='form-input'
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />

              <label htmlFor='productDescription' className='form-label'>
                Description:
              </label>
              <input
                type='text'
                id='productDescription'
                className='form-input'
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
              />

              <label htmlFor='productPrice' className='form-label'>
                Price:
              </label>
              <input
                type='number'
                id='productPrice'
                className='form-input'
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
              />
              
              <label htmlFor='productStock' className='form-label'>
                Stock:
              </label>
              <input
                type='number'
                id='productStock'
                className='form-input'
                value={productStock}
                onChange={(event) => setProductStock(event.target.value)}
              />

              <label htmlFor='productCategory' className='form-label'>
                Category:
              </label>
              <select
                type='text'
                id='productCategory'
                className='form-input'
                value={productCategory}
                onChange={(event) => setProductCategory(event.target.value)}
              >
              <option>Product 1</option>
                <option>Product 2</option>
                <option>Product 3</option>
              </select>

              <button type='submit' className='btn'>
                Add Product
              </button>
            </form>
          </UserProductWrapper>
        )}
      </div>
    </ModalWrapper>
  );
};

export default AddProductModal;