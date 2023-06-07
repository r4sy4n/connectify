import styled from 'styled-components';

const Wrapper = styled.main`
  background-color: #F3E8FF;

  .logo-big{
    margin-bottom: 3rem;
  }
  .container {
    width: 90vw;
    max-width: 1120px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
  }
  h1 {
    font-weight: 700;
  }
  p {
    margin: 3rem;
  }
  .how-container,
  .why-container,
  .brand-container,
  .brand-container { 
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 6rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }  
  .how-container, 
  .brand-container {
    background-color: #9DB2BF;
  }
  .how-container{
    height: 80vh;
  }
  .brand-container{
    height: 60vh;
  }
  .pic{
    width: 20rem;
  }
  .image-container{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 3rem;
    max-width: 100%;
  }
  .text{
    background: #fff;
    padding: 0.5rem;
  }
  .btn{
    padding: 1rem 2rem;
  }

/* xs */
/* @media (min-width: 475px) {} */

/* sm */
/* @media (min-width: 640px) {} */

/* md */
/* @media (min-width: 768px) {} */

/* lg */
/* @media (min-width: 1024px) {} */

/* xl */
/* @media (min-width: 1280px) {} */

/* 2xl */
/* @media (min-width: 1536px) {} */
  `
export default Wrapper;