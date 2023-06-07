import styled from 'styled-components';

const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
`;

const PopupContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3E8FF;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export { PopupWrapper, PopupContent }