import React from "react";
import { useContext, useState } from "react";
import { SharedLayoutContext } from "../pages/dashboard/SharedLayout";
import Wrapper from "../assets/wrappers/Sidebar";
import LogoBanner from "./LogoBanner";
import NavLinks from "./NavLinks";
import SettingLinks from "./SettingLinks";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs';

const Sidebar = () => {
    const {showSidebar, setShowsidebar} = useContext(SharedLayoutContext);
    const [sidebar, setSidebar] = useState(false);
    
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
