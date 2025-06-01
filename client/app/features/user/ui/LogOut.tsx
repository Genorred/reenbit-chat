import React from 'react';
import {useUserStore} from "~/features/user/model/user";
import Button from "~/shared/ui/Button";

const LogIn = () => {
    const setUser = useUserStore(state => state.set)
    const onPress = () => {
        setUser(null)
    }
    return (
        <Button onClick={onPress}>
            Log out
        </Button>
    );
};

export default LogIn;