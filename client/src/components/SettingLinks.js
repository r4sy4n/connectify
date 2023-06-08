import { NavLink } from 'react-router-dom';
import settinglinks from '../utils/settinglinks';
import { toast } from 'react-toastify';

const SettingLinks = (close) => {
  const handleLinkClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout Successful!');
    if (typeof close.toggle === 'function') {
      close.toggle();
    }
  }
  return (
    <div className='nav-links'>
      {settinglinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={text === 'Logout' ? handleLinkClick : undefined}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  )
}

export default SettingLinks;