import styled from "styled-components";

const CatalogWrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.25rem;
  width: 100%;
  min-width: 80vw;
  background: #fff;
  padding: 3rem 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
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
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: inset 0 0 0 2000px #00000030;
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

const CategoryWrapper = styled(CatalogWrapper)`

  .main-container {
    grid-template-columns: repeat(5, 1fr);
  }
`

const ProductWrapper = styled(CatalogWrapper)`

  // left column
  
  .main-container {
    grid-template-columns: repeat(2, 1fr);
    width: 70%;
  }

  .image-container {
    display: grid;
    grid-gap: 20px;
  }

  .image-container img {
    object-fit: cover;
    max-width: 100%;
  }

  .main-image-container {
    aspect-ratio: 1;
  }

  .other-images-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }

  .other-images-container img {
    background: darkred;
    aspect-ratio: 1;
  }

  // right column

  .product-details-container {
    text-align: left;
  }

  .title-container {
    background: transparent; 
  }
`

const UserProductWrapper = styled(CatalogWrapper)`

  .main-container {
    grid-template-columns: repeat(5, 1fr);
    width: 95%;
    margin: 50px 0;
  }
`
export { CatalogWrapper, CategoryWrapper, ProductWrapper, UserProductWrapper};
