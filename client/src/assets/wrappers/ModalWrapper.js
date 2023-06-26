import styled from "styled-components";

const ModalWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #24232350;
  top: 0;
  left: 0;
  z-index: 99;
  h2 {
        color: #2B3467;
    }

  p {
        margin: 0 !important;
    }

    .modal-container {
        position: relative;
        min-width: 30%;
        min-height: 35%;
        background: #FFF;
        text-align: left;
        border-radius: 10px;
        padding: 30px 50px;
    }

    .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 25px;
        height: 25px;
        font-size: 31px;
        background: #FFF;
        border-radius: 50%;
        top: -10px;
        right: -10px;
        cursor: pointer;
    }
    
    label {
        margin: 10px 0;
        color: #2B3467;
    }

    input {
        margin: 2px 0;
        padding: 5px;
    }
`

const LoginWrapper = styled.div`
    .title {
        text-align: center;
        margin-bottom: 20px;
    }

    form {
        display: grid;
    }

    .error-message {
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
    }

    .buttonContainer {
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
        left: 0;
        right: 0;
        bottom: 10%;
    }

    @media (max-width: 767px) {
        .buttonContainer {
            position: relative;
        } 
    }
`

const RegisterWrapper = styled(LoginWrapper)`

    .buttonContainer {
        position: relative;
    }

    form {
        margin: auto;
    }

    select {
        padding: 5px;
    }

    .login-text {
        cursor: pointer;
    }

    .already_member {
        text-align: center;
    }
`

const UserProductWrapper = styled.div`
`

const UserOrderWrapper = styled.div`
    table.orderModal {
        display: grid;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns: 
        minmax(150px, 1fr)
        minmax(150px, 1.67fr);

        td:first-child {
            font-weight: 700;
        }
    }
`

export { ModalWrapper, LoginWrapper, RegisterWrapper, UserProductWrapper, UserOrderWrapper };