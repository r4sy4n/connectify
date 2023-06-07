import styled from "styled-components";

const Wrapper = styled.nav`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background:#AEE2FF;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
.logo{
    width: 15rem;
}
span{
    color: blue;
    cursor: pointer;
}
ul {
    display: flex;
    justify-content: space-between;
    width: 350px;
    list-style-type: none;
    text-transform: capitalize;
    cursor: pointer;
}
.nav-center {
    display: flex;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s ease-in-out all;
}
`

export default Wrapper;