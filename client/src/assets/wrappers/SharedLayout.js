import styled from 'styled-components';

const Wrapper = styled.section`
  
    .dashboard {
      display: flex;
    }

    div:has(> .dashboard-page) {
      width: 100%;
    }

    .dashboard-page {
      margin: 0 auto;
      padding: 2rem;
      transition: 0.3s ease-in-out all;
    }
    .hide{
      margin-left: -250px;
      transition: 0.3s ease-in-out all;
    }
    .right{
      display: none;
      transition: 0.3s ease-in-out all;
    }
    .move-side{
      margin: 0 auto;
      padding: 2rem 0;
      position: absolute;
      /* top: 3rem; */
      left: 30px;
      transition: 0.3s ease-in-out all; 
    }
`
export default Wrapper;