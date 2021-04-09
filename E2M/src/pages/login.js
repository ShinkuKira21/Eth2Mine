import React from 'react'
import Session from '../api/session';
import RequestLogin from '../comps/py-server-scripts/scrLogin';

const login = () => {
    RequestLogin({username: "test"});
    return (
		 <div className='login'>
			<h1>Login</h1>
            <Session login={true}/>
		 </div>	
    );
}
export default login