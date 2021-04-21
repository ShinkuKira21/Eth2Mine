import {useState, useEffect} from 'react';
import {Redirect} from 'react-router';

function RequestRegister(props)
{
    const [status, setStatus] = useState(0);

    useEffect(() => {
        fetch('/account/register-submit', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(props),
        }).then(res => res.json()).then(data=>{setStatus(data.status);})
    }, []);

    if(status)
    {
        return (
            <div><Redirect to='/account/login'/></div>
        );
    }
    else if(status === false)
    {
        <div>
            Registration Error (500)
        </div>
    }

    else
    {
        return (
            <div>Loading!</div>
        );
    }
}

export default RequestRegister