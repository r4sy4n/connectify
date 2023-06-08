import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import Loading from '../components/Loading'

import { utils } from '../utils/Utils';

import { ProductWrapper } from '../assets/wrappers/Catalog';

const ProductPage = () => {

    const { productId } = useParams();

    const [ product, setProduct ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/products/${ productId }`)
        .then((dbResponse) => {
            setProduct(dbResponse.data.product);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    if(isLoading)
        return <Loading center />
  return (
    <ProductWrapper>
 
    <div className='main-container'>
    
        <div
            key={ product.name }
            className='image-container'
        >
            <div
                className='main-image-container'
            >
                <img
                    src={ product.image[0].url }
                    alt='Main Image'
                />
            </div>

            <div className='other-images-container'>
                
                <img
                    src=''
                    alt='Other Image'
                />
                <img
                    src=''
                    alt='Other Image'
                />
                <img
                    src=''
                    alt='Other Image'
                />
                <img
                    src=''
                    alt='Other Image'
                />
            </div>

        </div>

        <div className='product-details-container'>
            <div className='title-container'>
                <h2>
                    { utils.titleCase( product.name ) }
                </h2>
            </div>

            <div className='price-container'>
                <h4>
                    Price
                </h4>
            </div>

            <div className='description-container'>
                <h4>
                    Description
                </h4>
                <p>
                    { product.description }
                </p>
            </div>
        </div>
    </div>
    </ProductWrapper>
  )
}

export default ProductPage;