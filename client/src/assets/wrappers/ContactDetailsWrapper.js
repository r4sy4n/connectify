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
  background-color: rgb(157, 178, 191);
  width: 25rem;
  height: 5rem;
  padding-left: 20px;
  color: #F3E8FF;
  border-radius: 5px;

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

export { ContactDetailsWrapper, ContactItem }