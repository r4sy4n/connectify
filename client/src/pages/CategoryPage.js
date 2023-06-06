import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { utils } from '../components/Utils';

import { ProductWrapper } from '../assets/wrappers/Catalog';

const CategoryPage = () => {
    const { category } = useParams();

    const [ productList, setProductList ] = useState();

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/products/${ category }`)
        .then((dbResponse) => {
            setProductList(dbResponse.data.products)
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

  return (
  <ProductWrapper>
    <div className='title-container'>
      <h1>
        { utils.titleCase( category ) }
      </h1>
    </div>

    <div className='main-container'>
      {
        productList &&
        productList.map(list => 
          <div
            key={ list.name }
            className='list-container'
            onClick={() => console.log('a') }
          >
            <h2>{ list.name }</h2>
            <p>{ list.description }</p>
            <button>OPEN</button>
          </div>
        )
      }
    </div>
  </ProductWrapper>
  )
}

export default CategoryPage;