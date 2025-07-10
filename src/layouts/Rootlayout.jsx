import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';

const Rootlayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Rootlayout;