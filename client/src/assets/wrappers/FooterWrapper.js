import styled from 'styled-components';

const FooterWrapper = styled.footer`
    background: rgb(174, 226, 255);
    color: #041562;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    bottom: 0;
`;

const FooterContent = styled.div`
    text-align: center;

    p {
        margin-top: 5px;
        margin-bottom: 15px;
        font-size: 1rem;
        font-weight: bold;
    }

    .copyright {
        color: #EB455F;
    }

    .logo {
        width: 15rem;
    }

`;

export { FooterWrapper, FooterContent }