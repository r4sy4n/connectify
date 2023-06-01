import React from 'react';
import error from '../assets/images/error.png';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
     <Wrapper className='full-page'>
      <div>
        <img src={error} alt='error' />
        <h3>Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}

export default ErrorPage;