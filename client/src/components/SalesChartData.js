import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesChartData = ({orders}) => {
  const data = [
    {
      name: 'Sales',
      value: orders.reduce((total, order) => {
        const price = order.orderedProducts.map(item => parseInt(item.totalPrice));
        return total + price.reduce((a, b) => a + b, 0);
      }, 0),
    },
  ];

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#cd1818" />
      <text x="300" y="30" textAnchor="middle" dominantBaseline="middle">Total Sales</text>
    </BarChart>
  );
};

export default SalesChartData;
