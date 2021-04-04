import React from 'react'
import Session from '../api/session';
import FetchPing from '../comps/py-server';

const login = () => {
    return (
		 <div className='page-title'>
			<h1>Login</h1>
            <Session login={true}/>
		 </div>	
    );
}
export default login