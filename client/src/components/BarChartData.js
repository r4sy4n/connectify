import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartData = ({orders}) => {
  const data = [
  { name: 'Orders', value: orders.filter(order => order).length },
];

  return (
    <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#6c7ae0" />
        <text x="300" y="30" textAnchor="middle" dominantBaseline="middle">Total Orders</text>
      </BarChart>
  );
  }
  export default BarChartData;
