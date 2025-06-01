import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {$authHost} from "~/shared/lib/http";
import {useUserStore} from "~/features/user/model/user";


export const GoogleLogIn = () => {
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
            alert("successfuly logged in");
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
        <button
            style={{
                padding: "10px 20px",
            }}
            onClick={() => googleLogin()}
        >
            Sign in with Google
        </button>
    );
};