import React from 'react';
import {useUserStore} from "~/features/user/model/user";
import LogOut from "~/features/user/ui/LogOut";
import LogIn from '~/features/user/ui/LogIn';


const NavBar = () => {
    const user = useUserStore(state => state.user)
    return (
        <nav className='flex justify-between flex-row-reverse p-4'>
            {user
                ?
                <>
                    <LogOut/>
                    <div className='w-8 h-8'>

                    </div>
                </>
                :
                <LogIn/>
            }
        </nav>
    );
};

export default NavBar;