import styled from "styled-components";

const UserOrderWrapper = styled.main`
    border-radius: 0.25rem;
    width: 100%;
    min-width: 80vw;
    background: #fff;
    padding: 3rem 2rem 4rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  
    .title-container {
        width: 100%;
        padding: 50px 0;
        background: lightgray;
    }

    .main-container {
      width: 100%;
    }

    table {
        display: grid;
        border-collapse: collapse;
        min-width: 100%;
        grid-template-columns: 
        minmax(150px, 1fr)
        minmax(150px, 1.67fr)
        minmax(150px, 1.67fr)
        minmax(150px, 1.67fr)
        minmax(150px, 1.67fr);
    }
  
    thead,
    tbody,
    tr {
        display: contents;
    }
    
    th,
    td {
        padding: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    th {
        position: sticky;
        top: 0;
        background: #6c7ae0;
        text-align: left;
        font-weight: normal;
        font-size: 1.1rem;
        color: white;
    }
    
    th:last-child {
        border: 0;
    }
    
    td {
        color: #808080;
        background: #FFFFFF50;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    
    tr:nth-child(even) td {
        background: #f8f6ff;
    }
    
    tr:hover {
        cursor: pointer;
    }
    
    tr:hover td {
        background: #3498db50;
    }
`
export { UserOrderWrapper };
