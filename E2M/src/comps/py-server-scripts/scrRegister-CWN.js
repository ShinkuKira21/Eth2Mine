import {useState, useEffect} from 'react';
import RequestRegister from './scrRegister';

function CheckWorkerName(props)
{
    const [status, setStatus] = useState(0);

    useEffect(() => {
        fetch('/account/register-cwn', {
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
            <div>
                <RequestRegister workerName={props.workerName} workerPWD={props.workerPWD} workerFirstName={props.workerFirstName} workerLastName={props.workerLastName} workerWallet={props.workerWallet}/>
            </div>
        );
    }

    else
    {
        return (
            <div>Worker Name Exists</div>
        );
    }
}

export default CheckWorkerName