import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading';

import { GlobalVariables } from '../../App';
import { UserOrderWrapper } from '../../assets/wrappers/Orders';
import UserOrderModal from '../../components/UserOrderModal';

const Orders = () => {
  
    const { globalLoggedInUserId } = useContext( GlobalVariables )

    const [ orderList, setOrderList ] = useState();
    const [ orderId, setOrderId ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/order-list`).then((dbResponse) => {
            setOrderList(dbResponse.data.orderList);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);

  return (
  <UserOrderWrapper>
    <div className='title-container'>
      <h1>
        Orders
      </h1>
    </div>

    {    
    isLoading
        ? <Loading center />
        :
        <div className='main-container'>
          <table>
            <thead>
              <th>Date Ordered</th>
              <th>Tracking Number</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Status</th>
            </thead>
            <tbody>
              {
                orderList.map(list => {
                  return (
                    <tr onClick={ () => {
                      setIsModalOpen(true);
                      setOrderId(list._id);
                    }}>
                      <td>
                        { list.status[ list.status.length -1 ].date.split(',')[0] }
                      </td>
                      <td>
                        { list._id }
                      </td>
                      <td>
                        { list.customerName }
                      </td>
                      <td>
                        { list.customerNumber }
                      </td>
                      <td>
                        { list.status[ 0 ].label }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          {
              isModalOpen &&
              <UserOrderModal
                closeModal = { setIsModalOpen }
                orderId = { orderId }
              />
          }
        </div>
    }
  </UserOrderWrapper>
  )
}

export default Orders;