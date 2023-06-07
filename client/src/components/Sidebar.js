import React from "react";
import { useContext, useState, useEffect } from "react";
import { SharedLayoutContext } from "../pages/dashboard/SharedLayout";
import Wrapper from "../assets/wrappers/Sidebar";
import LogoBanner from "./LogoBanner";
import NavLinks from "./NavLinks";
import SettingLinks from "./SettingLinks";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs';
import { GlobalVariables } from '../App';

const Sidebar = () => {
  const {showSidebar, setShowsidebar} = useContext(SharedLayoutContext);
  const [sidebar, setSidebar] = useState(false);
  const { globalCurrentUser } = useContext( GlobalVariables );
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if(globalCurrentUser) {
      setFirstName(globalCurrentUser.firstName)
    }
  }, [globalCurrentUser])
  
  return (
   <Wrapper className={showSidebar ? null : 'hide'}>
      <div className='sidebar-container'>
        <div className='content'>
          <button type='button' className='toggle-btn' onClick={() => {
            setSidebar(!sidebar)  
            setShowsidebar(!showSidebar);
          }}>
            <BsFillArrowLeftSquareFill />
            <BsFillArrowRightSquareFill className={showSidebar ? 'right' : null}/>
          </button>
          <header>
            <LogoBanner className='logo'/>
          </header>
          <div className='greetings'>
            <h5>Welcome, {firstName}</h5>
          </div>
          <NavLinks/>
          <div className="settings">
            <SettingLinks/>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar;
