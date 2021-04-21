import React from 'react'
import Session from '../../api/session';

const login = () => {
    return (
		 <div className='login'>
			<h1>Login</h1>
            <Session login={true}/>
		 </div>	
    );
}
export default login