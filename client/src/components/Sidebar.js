import React from "react";
import { useContext } from "react";
import { SharedLayoutContext } from "../pages/dashboard/SharedLayout";
import Wrapper from "../assets/wrappers/Sidebar";

const Sidebar = () => {
      const {showSidebar} = useContext(SharedLayoutContext);

  return (
   <Wrapper className={showSidebar ? null : 'hide'}>
      <div className='sidebar-container'>
        <div className='content'>
          <header>
            
          </header>
          {/* <Navlinks/> */}
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar;
