import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { GlobalVariables } from '../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OrderGraph = () => {
    const [orderData, setOrderData] = useState(null);
    const { globalLoggedInUserId } = useContext( GlobalVariables );

  useEffect(() => {
    axios
      .get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/order-list`)
      .then(response => {
        const orders = response.data.orderList;
        if (orders) {
          const ordersByDate = countOrdersByDate(orders);
          setOrderData(ordersByDate);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const countOrdersByDate = orders => {
    const counts = {};
    orders.forEach(order => {
      const orderDate = order.status[0].date.split(',')[0];
      if (counts[orderDate]) {
        counts[orderDate]++;
      } else {
        counts[orderDate] = 1;
      }
    });

    const data = Object.entries(counts).map(([date, count]) => ({ date, count }));

    return data;
  };


  return (
    <div>
        <BarChart width={600} height={300} data={orderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="rgb(75, 192, 192)" name="Number of Orders" />
        </BarChart>
    </div>
  );
};

export default OrderGraph;