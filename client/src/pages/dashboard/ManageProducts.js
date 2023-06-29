import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Loading from '../../components/Loading';

import { GlobalVariables } from '../../App';
import { UserProductWrapper } from '../../assets/wrappers/Catalog';
import UserProductModal from '../../components/UserProductModal';
import AddProductModal from '../../components/AddProductModal';

const ManageProducts = () => {
  
    const { globalLoggedInUserId } = useContext( GlobalVariables )

    const [ productList, setProductList ] = useState();
    const [ productModal, setProductModal ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/product-list`).then((dbResponse) => {
            setProductList(dbResponse.data.productList);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

    const openAddProductModal = () => {
      setIsAddModalOpen(true);
    };
  
    const closeModals = () => {
      axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/product-list`).then((dbResponse) => {
          setProductList(dbResponse.data.productList);
          setIsLoading(false);
          setIsModalOpen(false);
          setIsAddModalOpen(false);
      })
    };

  return (
    <>
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
                productList &&
                productList.map(list => 
                <div
                    key={ list.productId.name }
                    className='list-container'
                    onClick={() => {
                      setIsModalOpen(true);
                      setProductModal(list);
                    }}
                    style={{ backgroundImage:`url(${ list.productId.image[0] ? list.productId.image[0].url : null })` }}
                >
                    <h2>{ list.productName ? list.productName : list.productId.name }</h2>
                    <p>{ list.description ? list.description : list.productId.description }</p>
                    <button>EDIT</button>
                </div>
                )
            }
            <div className='list-container add-product-container' onClick={openAddProductModal}>
                <h2>Add Product</h2>
                <button>+</button>
            </div>
            {
                isModalOpen &&
                <UserProductModal
                  closeModal = { closeModals }
                  product = { productModal }
                  setProductList = { setProductList }
                />
            }
            {
                isAddModalOpen && 
                <AddProductModal
                  closeModal={closeModals}
                  setProductList={setProductList}
                />
            }
            </div>
        }
      </UserProductWrapper>
    </>
  )
}

export default ManageProducts;