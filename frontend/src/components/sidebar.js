import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {

    let location = useLocation();
    
    return (
        <>
            <div className='sidebar'>
                {/* <Link to="/items" className={`sidebar-btn ${location.pathname === '/items' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Items</span>
                </Link>
                <Link to="/suplier" className={`sidebar-btn ${location.pathname === '/suplier' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Items</span>
                </Link>
                <Link to="/buyer" className={`sidebar-btn ${location.pathname === '/buyer' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Items</span>
                </Link> */}
                <Link to="/items" className={`sidebar-btn ${location.pathname === '/items' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Items</span>
                </Link>
                <Link to="/supplier" className={`sidebar-btn ${location.pathname === '/suplier' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Supplier</span>
                </Link>
                <Link to="/buyer" className={`sidebar-btn ${location.pathname === '/buyer' ? 'active' : ''}`}>
                    <span className='sidebar-btn-text'>Buyer</span>
                </Link>
            </div>
        </>
    )
}

export default Sidebar;