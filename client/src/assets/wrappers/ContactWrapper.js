import styled from "styled-components";

const ContactWrapper = styled.main`

text-align: center;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
position: relative;
margin: 9rem 0;
cursor: pointer;

.title-container {
  width: 100%;


  p {
    margin: 0;
    margin-top: 10px;
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
  width: 5px;
  height: 23rem;
  background-color: #EB455F;
  margin: 0 3rem;
  align-self: center;
}
`

// Contact Deatils

const ContactDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  background-color: rgb(157, 178, 191);
  width: 30rem;
  height: 6rem;
  padding-left: 20px;
  color: #F3E8FF;
  border-radius: 3px;

  .icon {
    background-color: #EB455F;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin: 0;
    align-self: center;
    color: #F3E8FF;
  }
`;

// Contact Form

const ContactFormWrapper = styled.div`
  width: 30rem;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
  width: 30rem;

  label {
    text-align: start;
    color: #EB455F;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    background-color: rgb(157, 178, 191);
    border: none;
    color: #F3E8FF;
    border-radius: 3px;
  }

  textarea {
    height: 10rem;
  }

  input {
    height: 3rem;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1rem;
  background-color: #EB455F;
  border: none;
  color: #F3E8FF;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 7rem;
`;


export {
  ContactWrapper, 
  ContactDetailsWrapper, 
  ContactItem, 
  ContactFormWrapper, 
  Form, 
  Button
}