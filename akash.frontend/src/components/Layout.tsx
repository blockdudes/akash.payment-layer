import React, { ReactNode } from 'react';
import CanvasBackground from './CanvasBackground';
import Navbar from './Navbar';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
        <div style={{ position: 'absolute' }}>
        <CanvasBackground />
        </div>
        <div style={{ position: 'relative' }}>
            <Navbar />
            {children}
        </div>
        </>
    )
}
export default Layout;


