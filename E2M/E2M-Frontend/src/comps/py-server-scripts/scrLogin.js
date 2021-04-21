import {useState, useEffect} from "react";
import {ReactSession} from 'react-client-session';
import { Redirect } from 'react-router';

function RequestLogin(props)
{
    const [authentication, setAuthentication] = useState(0);

    useEffect(() => {
        fetch('/account/login-submit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(props),
        }).then(res => res.json()).then(data=>{setAuthentication({auth: data.authentication, exec: data.execAuthentication});});
    }, []);

    SetSession({auth: authentication.auth, execAuth: authentication.exec, username: props.username, password: props.password});
    
    // Login Successful
    if(authentication.auth)
    {
        return (
            <div>
                <Redirect to='/account'/>
            </div>
        );
    }

    // this would have been nice in a component so that you could check if request is complete or not.
    else if (authentication.auth === false)
    {
        return(
            <div>
                Wrong Worker Name or Password!
            </div>
        );
        
    }

    else
    {
        return (
            <div>
                Loading!
            </div>
        );
    }
}

function SetSession(props)
{
    ReactSession.set("authentication", props.auth);
    ReactSession.set("execAuthentication", props.execAuth);
    ReactSession.set("username", props.username);
}

export default RequestLogin

