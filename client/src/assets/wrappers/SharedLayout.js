import styled from 'styled-components';

const Wrapper = styled.section`
  
    .dashboard {
      display: grid;
      grid-template-columns: 1fr;
    }
    .dashboard-page {
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      top: 6.5rem;
      left: 280px;
      transition: 0.3s ease-in-out all;
    }
    .hide{
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    .move-side{
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      top: 6.5rem;
      left: 30px;
      transition: 0.3s ease-in-out all; 
    }
`
export default Wrapper;