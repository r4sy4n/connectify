import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { CloseCircleOutline } from '@ricons/ionicons5';
import { Icon } from '@ricons/utils'

import Loading from '../components/Loading'
import { utils } from '../utils/Utils'

import { ModalWrapper, UserOrderWrapper } from '../assets/wrappers/ModalWrapper';

const UserOrderModal = ({ closeModal, orderId }) => {

    const [ order, setOrder ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    const titleCase = (text) => {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/orders/${ orderId }`).then((dbResponse) => {
            setOrder(dbResponse.data.order);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

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

                <UserOrderWrapper>
                    {
                    isLoading
                    ? <Loading center />
                    :
                    <>
                    <h3>
                        Order - { order._id }
                    </h3>
                    <table className='orderModal'>
                        <tbody>
                            {
                                Object.entries(order).filter( ([key, _]) =>  key !== '_id' && key !== 'sellerId' && key !== '__v').map(list => {
                                    return (
                                    <tr>
                                        <td>
                                        { titleCase(list[0]) }
                                        </td>
                                        <td>
                                        {
                                            typeof list[1] !== 'object' //check if the order property value is an array or not (ie. orderedProducts, status)
                                            ? list[1]
                                            : <ul>
                                                {
                                                    list[1].map(list =>
                                                        <li>
                                                            {
                                                                `${typeof Object.values(list)[0] !== 'object' //checks if the order property value's value is an array (ie. productId)
                                                                ? Object.values(list)[0]
                                                                : Object.values(list)[0].name } - ${Object.values(list)[1]}`
                                                            }
                                                        </li>
                                                    )
                                                 }
                                              </ul>}
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </>
                    }
                </UserOrderWrapper>
                }
            </div>
        </ModalWrapper>
  )
}

export default UserOrderModal;