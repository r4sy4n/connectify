import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { GlobalVariables } from '../App';

import Loading from './Loading';
import { utils } from '../utils/Utils';


import { ModalWrapper, UserProductWrapper } from '../assets/wrappers/ModalWrapper';
import { CatalogWrapper } from '../assets/wrappers/Catalog';

import { categories } from '../assets/data/CategoryList';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

const AddProductModal = ({ closeModal, setProductList }) => {
  const { globalLoggedInUserId, globalCurrentUser } = useContext( GlobalVariables )

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPage, setProductPage] = useState('catalog');
  const [category, setCategory] = useState();
  const [addProductList, setAddProductList] = useState();
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

  const browseProduct = (array) => {
    let displayContainer = [];

    array.map(list => 
      
      displayContainer.push(

        <div
          key={ list.name }
          className='list-container'
          onClick={() => { productPage === 'catalog' ? changeCategory(list.name) : addProduct(list) }}
          style={{ backgroundImage:`url(${ list.image[0].url || list.image })` }}
        >
          <h2>{ list.name }</h2>
          <p>{ list.description }</p>
          <button> { productPage === 'catalog' ? 'OPEN' : 'ADD PRODUCT' } </button>
        </div>
      )
    )

    const changeCategory = (list) => {
      
      if (productPage === 'catalog') {
        setProductPage('product');
        setCategory( list.trim().replace(/\s+/g, '-').toLowerCase());
      }
    }

    const addProduct = (list) => {
      axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/users/${ globalLoggedInUserId }/product-list`, { type: 'add', product: list })
      .then(userResponse => {
        toast.success('Product added successfully.');
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error('Failed to add product.');
        setIsLoading(false)
        console.log(error);
      });
    }


    
    return displayContainer;
  }

  useEffect(() => {
    setIsLoading(true);

    axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/products/${ category }/products`)
    .then((dbResponse) => {
        setAddProductList(dbResponse.data.products);
        setIsLoading(false);
    })
    .catch(error => {
        console.log(error);
    })
  }, [category])

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
          globalCurrentUser &&
          globalCurrentUser.userType === 'supplier'
          ?
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
          :
            <CatalogWrapper>

              {
                productPage === 'catalog'
                ?
                  <>
                    <div className='title-container'>
                      <h1>
                        Catalog
                      </h1>
                    </div>

                    <div className='main-container'>
                      { browseProduct(categories) }
                    </div>
                  </>
                :
                <>
                  <div className='title-container'>
                    <h1>
                      { utils.titleCase( category ) }
                    </h1>
                  </div>
                  {
                    isLoading
                    ? 
                      <Loading center />
                    :
                      <div className='main-container'>
                        { browseProduct(addProductList) }
                      </div>
                  }
                </>
                  
              }
          </CatalogWrapper>
        )}
      </div>
    </ModalWrapper>
  );
};

export default AddProductModal;