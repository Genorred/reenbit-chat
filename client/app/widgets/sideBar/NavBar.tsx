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
                    <div className='w-12 h-12'>
                        <Avatar width={60} height={60} src={user.picture} />

                    </div>
                </>
                :
                <LogIn/>
            }
        </nav>
    );
};

export default NavBar;