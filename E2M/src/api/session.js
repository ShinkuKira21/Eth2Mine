import React from 'react';
import RequestLogin from '../comps/py-server-scripts/scrLogin'

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
        bSearch: false,
    }

    CheckLogin()
    {
        if(this.state.workerName != null && this.state.workerPWD != null)
            this.setState({bSearch: true});
           
    }

    UpdateWorkerName = (event) =>
    {
        this.setState({bSearch: false, workerName: event.target.value});
    }

    UpdateWorkerPassword = (event) =>
    {
        this.setState({workerPWD: event.target.value});
    }

    render()
    {
        if(this.props.login)
        {         
            return(
                <div>
                    <div className='Login-Form'>
                        <label id='account-workerName'>Your Worker Name: <br/><input type='text' onChange={this.UpdateWorkerName}/></label><br/>
                        <label id='account-password'>Password:<br/><input type='password' onChange={this.UpdateWorkerPassword}/></label><br/>
                        <label>Select Mining Pool:</label><br/>
                            <select id='eth-wallet'>
                                <option>Eth4Default</option>
                            </select>
                        <br/>
                        <br/>
                        <button onClick={() => this.CheckLogin()}>Login</button>
                    </div>
                    <div>
                        {this.state.bSearch ? <div><RequestLogin username={this.state.workerName} password={this.state.workerPWD}/></div> : <div></div>}
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    
                </div>
            );
        }
        
    }
}