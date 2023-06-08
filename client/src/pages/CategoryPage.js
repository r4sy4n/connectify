import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Loading from '../components/Loading'

import { utils } from '../utils/Utils';

import { CategoryWrapper } from '../assets/wrappers/Catalog';

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [ productList, setProductList ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/products/${ category }/products`)
        .then((dbResponse) => {
            setProductList(dbResponse.data.products);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

  return (
  <CategoryWrapper>
    <div className='title-container'>
      <h1>
        { utils.titleCase( category ) }
      </h1>
    </div>

    {    
    isLoading
        ? <Loading center />
        :
        <div className='main-container'>
        {
            productList.map(list => 
            <div
                key={ list.name }
                className='list-container'
                onClick={() => navigate( list._id ) }
                style={{ backgroundImage:`url(${ list.image[0].url })` }}
            >
                <h2>{ list.name }</h2>
                <p>{ list.description }</p>
                <button>OPEN</button>
            </div>
            )
        }
        </div>
    }
  </CategoryWrapper>
  )
}

export default CategoryPage;