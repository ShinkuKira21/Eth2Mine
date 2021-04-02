import React from 'react'

const login = () => {
    return (
		 <div className='page-title'>
			<h1>Login</h1>
	    <LoginPrompt/>
		 </div>	
    );
}

function LoginPrompt()
{
   return (
        <div className='Login-Form'>
			<label id='account-wallet'>Your ETH Wallet: <input type='text'/></label><br/>
            <label id='account-password'>Account Password: <input type='text'/></label><br/>
            <label>Select Mining Pool:</label><br/>
                <select id='eth-wallet'>
                    <option>Eth4Default</option>
                </select>
            <br/>
            <br/>
            <button>Login</button>
		</div>
   );
}

function CheckLogin()
{
    
}

export default login