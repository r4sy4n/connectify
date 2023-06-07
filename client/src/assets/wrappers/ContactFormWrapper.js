import styled from 'styled-components';

const ContactFormWrapper = styled.div`
  width: 25rem;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
  width: 25rem;

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
    background-color: #EB455F;
    border: none;
    color: #F3E8FF;

    &::placeholder {
        color: #F3E8FF;
    }
  }

  textarea {
    height: 8rem;
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
`;

export { ContactFormWrapper, Form, Button };