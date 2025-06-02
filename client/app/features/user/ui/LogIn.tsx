import React from 'react';
import {Link} from "react-router";
import {buttonVariants} from "~/shared/ui/Button";

const LogIn = () => {
    return (
        <Link className={buttonVariants('primary')} to={{pathname: "/sign-in"}}>
            Log in
        </Link>
    );
};

export default LogIn;