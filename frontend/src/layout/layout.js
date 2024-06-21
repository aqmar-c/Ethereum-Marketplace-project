import {  Routes, Route } from 'react-router-dom';

import Items from '../pages/items.js';
import Buyer from '../pages/buyer.js';
import Supplier from '../pages/supplier.js';
import Sidebar from '../components/sidebar.js';
import '../assets/css/client.css';

const  Layout = () => {

    return (
        <>
            <Sidebar></Sidebar>
            <div className='layout-content'>
                <div className='client-content-page'>
                    <Routes>
                        <Route path="/" element={<Items/>}></Route>
                        <Route path="/buyer" element={<Buyer/>}></Route>
                        <Route path="/supplier" element={<Supplier/>}></Route>
                        <Route path="/items" element={<Items/>}></Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}
export default Layout;