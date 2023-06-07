import styled from "styled-components";

const ContactWrapper = styled.main`

text-align: center;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
position: relative;
z-index: 1;

.title-container {
  width: 100%;
  padding: 10rem 0;

  p {
    font-size: 18px;
    margin: 0;
    text-align: center; 
    max-width: none;
  }

  h1 {
    margin: 0;
    font-weight: bold;
  }
}

`

export default ContactWrapper