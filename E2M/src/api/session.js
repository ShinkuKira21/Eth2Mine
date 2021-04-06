import React from 'react';
import { Redirect } from 'react-router';
import FetchPing from '../comps/py-server-scripts/ping';

export default class Session extends React.Component
{
    state =
    {
        bAdmin: null,
        bLoggedin: null,
        workerName: null,
        workerPWD: null,
        miningPool: null,
        accountInfo: null,
    }

    CheckLogin()
    {
        if(this.state.workerName != null)
        {
            if(this.state.workerName == "admin-token")
                this.state.bAdmin = true;

            this.state.bLoggedin = true;

            if(this.state.bLoggedin)
                <Redirect to="/account"/>
        }
    }

    UpdateForm = (event) =>
    {
        this.setState({workerName: event.target.value});
        this.setState({workerPWD: event.target.value});
    }

    GetAccount()
    {
        
    }

    render()
    {
        if(this.props.login == true)
        {
            return(
                <div className='Login-Form'>
                    <label id='account-workerName'>Your Worker Name: <br/><input type='text' onChange={this.UpdateForm}/></label><br/>
                    <label id='account-password'>Password:<br/><input type='password' onChange={this.UpdateForm}/></label><br/>
                    <label>Select Mining Pool:</label><br/>
                        <select id='eth-wallet'>
                            <option>Eth4Default</option>
                        </select>
                    <br/>
                    <br/>
                    <button onClick={() => this.CheckLogin()}>Login</button>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    Register
                </div>
            );
        }
        
    }
}

