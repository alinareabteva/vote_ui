import React from 'react';
import {Heading} from "./Heading";

const MainLayout = ({children}) => {
    return (
        <div className="main">
            <Heading />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;