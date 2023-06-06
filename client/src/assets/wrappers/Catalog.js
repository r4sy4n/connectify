import styled from "styled-components";

const CatalogWrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .title-container {
    width: 100%;
    padding: 50px 0;
    background: lightgray;
  }

  .main-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    width: 80%;
    margin: 100px 0;
  }

  .list-container {
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: darkred;
    aspect-ratio: 1;

    &:hover {
      cursor: pointer;
    }
  }

  .list-container * {
    color: white;
  }

  button {
    min-width: 150px;
    background: transparent;
    border: 2px solid #FFFFFF80;
    border-radius: 50px;
    padding: 10px 20px;
    margin-top: 20px;
    transition: all 0.3s ease-out;

    &:hover {
      cursor: pointer;
      border: 2px solid #FFFFFF;
    }
  }
`

const ProductWrapper = styled(CatalogWrapper)`

  .main-container {
    grid-template-columns: repeat(5, 1fr);
  }
`
export { CatalogWrapper, ProductWrapper};