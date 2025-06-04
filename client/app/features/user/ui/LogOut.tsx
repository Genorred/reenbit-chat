import React from 'react';
import {useNavigate} from 'react-router';
import {Button} from '~/shared/ui/Button';
import {useUserStore} from '../model/user';
import {$authHost} from '~/shared/lib/http';
import {queryClient} from "~/shared/lib/queryClient";

export const LogOut = () => {
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.set);

    const handleLogout = async () => {
        try {
            const url = import.meta.env.VITE_API_URL + '/api/auth/logout';
            await $authHost.post(url);
            setUser(null);
            queryClient.clear();
            navigate('/sign-in');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <Button
            className='h-fit'
            variant="secondary"
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};