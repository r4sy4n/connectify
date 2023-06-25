import React, { useContext, useState, useEffect } from 'react';
import Wrapper from '../../assets/wrappers/Dashboard';
import { SharedLayoutContext } from './SharedLayout';
import Loading from '../../components/Loading';
import axios from 'axios';
import { GlobalVariables } from '../../App';
import BarChartData from '../../components/BarChartData';
import SalesChartData from '../../components/SalesChartData';


const Dashboard = () => {
  const { showSidebar } = useContext(SharedLayoutContext);
  const [ isLoading, setIsLoading ] = useState(true);
    const { globalLoggedInUserId } = useContext( GlobalVariables );
    const [orders, setorders] = useState([]);


  useEffect(() => {
    axios.get(`${ process.env.REACT_APP_API_BASE_URL }/api/v1/users/${ globalLoggedInUserId }/order-list`).then( response => {
      console.log(response)
      setorders(response.data.orderList);
      setIsLoading(false);
    })
  }, [globalLoggedInUserId]);


  if (isLoading) {
  return <Loading center />;
  }


  return (
    <Wrapper>
       <div className={showSidebar ? 'form' : 'form-move'}>
        <h1>Dashboard</h1>
        <section className='flex'>
          <div className='grid'>
          </div>
        </section>
        <section>
          <div className='grid-chart'>
            <BarChartData orders={orders}/>
            <SalesChartData orders={orders}/>
          </div>
        </section>
      </div>

    </Wrapper>
  )
}

export default Dashboard;