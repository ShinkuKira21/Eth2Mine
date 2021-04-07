import React from 'react'
import Session from '../api/session';
import RequestLogin from '../comps/py-server-scripts/scrLogin';
const login = () => {
    return (
		 <div className='page-title'>
			<h1>Login</h1>
            <Session login={true}/>
            <RequestLogin username='test' password='pass'/>
		 </div>	
    );
}
export default login