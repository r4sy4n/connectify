import styled from 'styled-components';

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
  background-color: #EB455F;
  width: 25rem;
  height: 5rem;
  padding-left: 20px;
  color: #F3E8FF;

  p {
    margin: 0;
    align-self: center;
    color: #F3E8FF;
  }
`;

export { ContactDetailsWrapper, ContactItem }