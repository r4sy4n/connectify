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

  }
  .brand-container{
    height: 60vh;
  }
  .pic{
    width: 20rem;
  }
  .why-container{
    margin-top: 2rem;
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
    margin-bottom: 1.5rem;
  }


/* md */
@media only screen and (max-width: 768px) {
  .title{
    font-size: 2.5rem;
  }
  .subtitle{
    font-size: 2rem;
  }

  .description{
    font-size: 1rem;
  }
  .logo-big{
    width: 25rem;
  }
  .image-container{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 0;
  }
    .pic{
    width: 8rem;
  }
  .how-container{
    padding-top: 1rem;
  }
}

/* lg */
@media only screen and (max-width: 1024px) {
  .pic{
    width: 10rem;
  }
  .text{
    font-size: 1.2rem;
  }
}
`
export default Wrapper;