import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {$authHost} from "~/shared/lib/http";
import {useUserStore} from "~/features/user/model/user";
import {Button} from "~/shared/ui/Button";
import {FcGoogle} from "react-icons/fc";
import {useNavigate} from "react-router";


export const GoogleLogIn = () => {
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.set);
    const googleLogin = useGoogleLogin({
        onSuccess: async (authResult) => {
            console.log(authResult);
            const url = import.meta.env.VITE_API_URL + '/api/auth/google/callback';
            const result = await $authHost.post(url, {
                token: authResult.access_token,
                // codeVerifier: authResult.
            });
            setUser(result.data.user);
            navigate('/')
        },
        onError: (errorResponse) => {
            console.log(errorResponse)
            // toast.error()
        },
        onNonOAuthError: (errorResponse) => {
            console.log(errorResponse)
            // toast.error()
        },
        // flow: "auth-code",
    });

    return (
        <Button variant='secondary' fullWidth className='flex gap-2 justify-center items-center h-12'
            onClick={() => googleLogin()}
        >
            <FcGoogle className='h-8 w-8'/>
            Sign in with Google
        </Button>
    );
};