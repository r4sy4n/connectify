import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import Sidebar from '../../components/Sidebar';

export const SharedLayoutContext = createContext();

const SharedLayout = () => {
  const [showSidebar, setShowsidebar] = useState(true);
  const navigate = useNavigate();

  return (
   <SharedLayoutContext.Provider value={{showSidebar, setShowsidebar}}>
      <Wrapper>
          <main className='dashboard'>
            <Sidebar/>
              <div>
                  <div className={showSidebar ? 'dashboard-page' : 'move-side'}>
                      <Outlet/>
                  </div>
              </div>
          </main>
      </Wrapper>
    </SharedLayoutContext.Provider>
  )
};

export default SharedLayout;