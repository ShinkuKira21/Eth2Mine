import {useState, useEffect} from "react";

function RequestLogin(props)
{
    const [authentication, setAuthentication] = useState(0);
    const userInfo = {properties: props};
    
    useEffect(() => {
        fetch('/account/login-submit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        }).then(res => res.json()).then(data=>{setAuthentication(data.authentication);
        });
    }, []);

    return (
        <div>{authentication}</div>
    );
}

export default RequestLogin