import React from "react";
import { ReactSession } from "react-client-session";
import { Redirect } from "react-router";

const Logout = () =>
{
    ExpireSession();
    return (
        <div>
            <Redirect to='/account/login'/>
        </div>
    );
}


function ExpireSession()
{
    ReactSession.remove("authentication");
    ReactSession.remove("execAuthentication");
    ReactSession.remove("username");
}


export default Logout