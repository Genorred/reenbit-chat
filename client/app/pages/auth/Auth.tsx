import React from 'react';
import Input from "~/shared/ui/Input";
import Button from "~/shared/ui/Button";
import {GoogleLogIn} from "~/features/user/ui/GoogleLogIn";

const Auth = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='pt-36 flex justify-center' onSubmit={onSubmit}>
            <form className='w-full max-w-xl flex flex-col gap-4'>
                <Input />
                <Input />
                <Button>Login</Button>
                or
                <GoogleLogIn />
            </form>
        </div>
    );
};

export default Auth;