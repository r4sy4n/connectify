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
.icon{
    color: blue;
    display: none;
}
span{
    color: blue;
    cursor: pointer;
    display: block;
    width: 8.75em;
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

/* xs */
/* @media only screen and (min-width: 475px) {

} */

/* sm */
/* @media only screen and (min-width: 640px) {

} */

/* md */
/* @media only screen and (min-width: 768px) {

} */

/* lg */
@media only screen and (max-width: 992px) {
    .list, .logo{
        display: none;
    }
    .icon{
    display: block;
    }
}

/* xl */
/* @media only screen and (min-width: 1280px) {

} */

/* 2xl */
/* @media only screen and (min-width: 1536px) {

} */

.container {
  max-width: 1050px;
  width: 90%;
  margin: auto;
}

.navbar {
  width: 100%;
  box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
}

.navbar .menu-items {
  display: flex;
}

.navbar .nav-container li {
  list-style: none;
}

.navbar .nav-container li {
  text-decoration: none;
  color: #0e2431;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.7rem;
}

.navbar .nav-container li:hover{
    font-weight: bolder;
}

.nav-container {
  display: block;
  position: relative;
  height: 60px;
}

.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 20px;
  left: 20px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.nav-container .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: blue;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.navbar .menu-items {
  padding-top: 120px;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 1);
  height: 100vh;
  width: 100%;
  transform: translate(-150%);
  display: flex;
  flex-direction: column;
  margin-left: -40px;
  padding-left: 50px;
  transition: transform 0.5s ease-in-out;
  text-align: center;
}

.navbar .menu-items li {
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
}



.nav-container input[type="checkbox"]:checked ~ .menu-items {
  transform: translateX(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
  transform: rotate(-45deg);
}

.nav-container input[type="checkbox"]:checked ~ .logo{
  display: none;
}

`

export default Wrapper;