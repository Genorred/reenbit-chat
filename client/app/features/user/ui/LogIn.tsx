import React from 'react';
import {useNavigate} from "react-router";
import Button from "~/shared/ui/Button";

const LogIn = () => {
    const navigate = useNavigate();

    const onPress = () => {
        navigate('/auth')
    }
    return (
        <Button onClick={onPress}>
            Log in
        </Button>
    );
};

export default LogIn;