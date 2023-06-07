import styled from "styled-components";

const ContactWrapper = styled.main`

text-align: center;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
position: relative;
margin-top: 13rem;
cursor: pointer;

.title-container {
  width: 100%;


  p {
    margin: 0;
    text-align: center; 
    max-width: none;
  }

  h1 {
    margin: 0;
    font-weight: bold;
  }
}


/* Contact Details */

.contact-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 3rem;
  padding: 3rem;
}


/* Border */

.contact-border {
  width: 3px;
  height: 20rem;
  background-color: #EB455F;
  margin: 0 3rem;
  align-self: center;
}
`



export default ContactWrapper