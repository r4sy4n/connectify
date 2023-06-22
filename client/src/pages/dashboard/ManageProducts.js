import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading';

import { GlobalVariables } from '../../App';
import { UserProductWrapper } from '../../assets/wrappers/Catalog';
import UserProductModal from '../../components/UserProductModal';

const ManageProducts = () => {
  
    const { globalLoggedInUserId } = useContext( GlobalVariables )

    const [ productList, setProductList ] = useState();
    const [ productModal, setProductModal ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/product-list`).then((dbResponse) => {
            setProductList(dbResponse.data.productList);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

  return (
  <UserProductWrapper>
    <div className='title-container'>
      <h1>
        Manage Products
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
                key={ list.productId.name }
                className='list-container'
                onClick={() => {
                  setIsModalOpen(true);
                  setProductModal(list);
                }}
                style={{ backgroundImage:`url(${ list.productId.image[0].url })` }}
            >
                <h2>{ list.productId.name }</h2>
                <p>{ list.productId.description }</p>
                <button>EDIT</button>
            </div>
            )
        }
        {
            isModalOpen &&
            <UserProductModal
              closeModal = { setIsModalOpen }
              product = { productModal }
              setProductList = { setProductList }
            />
        }
        </div>
    }
  </UserProductWrapper>
  )
}

export default ManageProducts;