import {FiSettings} from 'react-icons/fi';
import {CgLogOut} from 'react-icons/cg';

const settinglinks = [
    {
        id: 1,
        text: 'Settings',
        path: 'settings',
        icon: <FiSettings/>,
    },
    {
        id: 2,
        text: 'Logout',
        path: '/',
        icon: <CgLogOut/>,
    },
]
export default settinglinks;