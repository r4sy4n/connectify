import React from "react";
import { useContext } from "react";
import { SharedLayoutContext } from "../pages/dashboard/SharedLayout";
import Wrapper from "../assets/wrappers/Sidebar";
import LogoBanner from "./LogoBanner";
import NavLinks from "./NavLinks";
import SettingLinks from "./SettingLinks";

const Sidebar = () => {
      const {showSidebar} = useContext(SharedLayoutContext);

  return (
   <Wrapper className={showSidebar ? null : 'hide'}>
      <div className='sidebar-container'>
        <div className='content'>
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
