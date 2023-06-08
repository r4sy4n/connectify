import {CgProfile} from 'react-icons/cg';
import {MdProductionQuantityLimits} from 'react-icons/md';
import {MdOutlineInventory2} from 'react-icons/md';
import {LuLayoutDashboard} from 'react-icons/lu';

const links = [
    {
        id: 1,
        text: 'Stats',
        path: '',
        icon: <LuLayoutDashboard/>,
    },
    {
        id: 2,
        text: 'Seller',
        path: 'profile',
        icon: <CgProfile/>,
    },
    {
        id: 3,
        text: 'Supplier',
        path: 'profile',
        icon: <CgProfile/>,
    },
    {
        id: 4,
        text: 'Orders',
        path: 'orders',
        icon: <MdProductionQuantityLimits/>,
    },
    {
        id: 5,
        text: 'Products',
        path: 'manage',
        icon: <MdOutlineInventory2/>,
    },
]

export default links;