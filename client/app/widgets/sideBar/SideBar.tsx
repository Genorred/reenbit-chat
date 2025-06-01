import React, {type PropsWithChildren} from 'react';
import NavBar from "~/widgets/navbar/ui/NavBar";
import {Outlet} from "react-router";

const SideBar = () => {
    return (
        <div className='w-full max-w-[640px]'>
            <NavBar/>
            <Outlet />
        </div>
    );
};

export default SideBar;