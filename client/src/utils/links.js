import {CgProfile} from 'react-icons/cg';
import {MdProductionQuantityLimits} from 'react-icons/md';
import {MdOutlineInventory2} from 'react-icons/md';
import {FiSettings} from 'react-icons/fi';
import {CgLogOut} from 'react-icons/cg';

const links = [
    {
        id: 1,
        text: 'Seller',
        path: 'seller/profile',
        icon: <CgProfile/>,
    },
    {
        id: 2,
        text: 'Supplier',
        path: 'supplier/profile',
        icon: <CgProfile/>,
    },
    {
        id: 3,
        text: 'Orders',
        path: 'seller/orders',
        icon: <MdProductionQuantityLimits/>,
    },
    {
        id: 4,
        text: 'Orders',
        path: 'supplier/orders',
        icon: <MdProductionQuantityLimits/>,
    },
    {
        id: 5,
        text: 'Products',
        path: 'seller/manage',
        icon: <MdOutlineInventory2/>,
    },
    {
        id: 6,
        text: 'Products',
        path: 'supplier/manage',
        icon: <MdOutlineInventory2/>,
    },
]

export default links;