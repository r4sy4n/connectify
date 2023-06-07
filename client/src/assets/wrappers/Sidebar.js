import styled from "styled-components";

const Wrapper = styled.aside`
box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
transition: 0.3s ease-in-out all;
  .sidebar-container {
      background: #AEE2FF;
      min-height: 100vh;
      height: 100%;
      width: 250px;
      transition: 0.3s ease-in-out all;
    }
  .content {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  header {
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 2.5rem;
    }
    .toggle-btn{
      margin-left: 220px;
      padding-top: 1rem;
      background: transparent;
      border-color: transparent;
      font-size: 1.75rem;
      color: #EB455F;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: 0.3s ease-in-out all;
    }
    h5{
      color: #EB455F;
    }
    .greetings{
      text-align: center;
    }
    .logo{
      width: 250px;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: 0.3s ease-in-out all;
    }
    .active {
      color: #AEE2FF;
    }
    .active .icon {
      color: #0079FF;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #EB455F;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: 0.3s ease-in-out all;
      text-decoration: none;
      letter-spacing: 1px;
    }
    .nav-link:hover {
      background: #f0f4f8;
      padding-left: 3rem;
      color: #0079FF;
    }
    .nav-link:hover .icon {
      color: #0079FF;
    }
    .settings{
      margin-top: 20rem;
    }
`
export default Wrapper;