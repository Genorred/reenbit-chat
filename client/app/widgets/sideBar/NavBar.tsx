import React from 'react';
import {useUserStore} from "~/features/user/model/user";
import LogIn from '~/features/user/ui/LogIn';
import {LogOut} from "~/features/user/ui/LogOut";
import Avatar from "~/shared/ui/Avatar";


const NavBar = () => {
    const user = useUserStore(state => state.user)
    return (
        <nav className='flex justify-between flex-row-reverse items-center p-4'>
            {user
                ?
                <>
                    <LogOut/>
                    <Avatar width={60} height={60} src={user.picture} alt='user avatar'/>
                </>
                :
                <LogIn/>
            }
        </nav>
    );
};

export default NavBar;