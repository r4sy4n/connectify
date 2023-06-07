import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { GlobalVariables } from '../App';
import { useContext, useEffect, useState } from 'react';

const NavLinks = (close) => {
  const handleLinkClick = () => {
    if (typeof close.toggle === 'function') {
      close.toggle();
    }
  }
  
  const { globalCurrentUser } = useContext( GlobalVariables );
  const [userType, setUserType] = useState('');

  useEffect(() => {
    if(globalCurrentUser) {
      setUserType(globalCurrentUser.userType)
    }
  },[globalCurrentUser])
  
  return (
    <div className='nav-links'>
      {links.filter((link) => {
        if (userType === 'seller') {
          return link.text.toLowerCase() !== 'supplier';
        } else {
          return link.text.toLowerCase() !== 'seller';
        } 
      }).map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={handleLinkClick}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  )
}

export default NavLinks;
