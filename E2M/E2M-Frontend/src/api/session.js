import React from 'react';
import RequestLogin from '../comps/py-server-scripts/scrLogin';
import CheckWorkerName from '../comps/py-server-scripts/scrRegister-CWN';

export default class Session extends React.Component
{
    state =
    {
        bAdmin: null,
        bLoggedin: null,
        workerName: null,
        workerPWD: null,
        workerConfirmPWD: null,
        workerFirstName: null,
        workerLastName: null,
        workerWallet: null,
        miningPool: null,
        accountInfo: null,
        error: null,
        bUpdatePWD: false,
        bSearch: false,
    }

    // Check LOGIN and REGISTER
    CheckLogin()
    {
        if(this.state.workerName && this.state.workerPWD)
            this.setState({bSearch: true});
    }

    CheckRegister()
    {
        if(this.state.workerName && this.state.workerFirstName && this.state.workerLastName && this.state.workerWallet && this.state.workerPWD === this.state.workerConfirmPWD)    
            this.setState({bSearch: true});
    }

    // REAL TIME UPDATE (so if a user types a workername it will validate as it is typed) - (This needs work to only post if stopped.)
    /* 
    ValidateWorkerName()
    {
        ReactSession.remove('reg-cwn');

        if(this.state.workerName)
        {
            <CheckWorkerName workerName={this.state.workerName}/>

            if(ReactSession.get('reg-cwn'))
                this.setState({bUpdate: false, error: ""});

            else
                this.setState({bUpdate: false, error: "Worker name exists"});
        }
        
    }*/

    ValidatePassword()
    {
        if(this.state.workerPWD && this.state.workerPWD)
        {
            if(this.state.workerPWD === this.state.workerConfirmPWD)
                this.setState({bUpdate: false, error: "Password Matches"});
        
            else this.setState({bUpdate: false, bSearch: false, error: "Password Mismatch"});
        }
        else
            this.setState({bUpdate: false, bSearch: false, error: ""});
    }

     // LOGIN and REGISTER COMPONENTS
    UpdateWorkerName = (event) =>
    {
        this.setState({bSearch: false, workerName: event.target.value});
    }

    UpdateWorkerPassword = (event) =>
    { 
        this.setState({bUpdate: true, bSearch: false, workerPWD: event.target.value});
    }

    // REGISTER COMPONENTS
    UpdateConfirmPassword = (event) =>
    {
        this.setState({bUpdate: true, bSearch: false, workerConfirmPWD: event.target.value});
    }

    UpdateFirstName = (event) =>
    {
        this.setState({bSearch: false, workerFirstName: event.target.value});
    }

    UpdateSurname = (event) =>
    {
        this.setState({bSearch: false, workerLastName: event.target.value});
    }

    UpdateWallet = (event) =>
    {
        this.setState({bSearch: false, workerWallet: event.target.value});
    }

    render()
    {
        if(this.props.login)
        {         
            return(
                <div>
                    <div className='login-form'>
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
                    <div className='login-status'>
                        {this.state.bSearch ? <div><RequestLogin username={this.state.workerName} password={this.state.workerPWD}/></div> : <div></div>}
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div>
                    <div className='register-form'>
                        <label>Worker Name<br/><input type='text' onChange={this.UpdateWorkerName}/></label><br/>
                        <label>First Name<br/><input type='text' onChange={this.UpdateFirstName}/></label><br/>
                        <label>Surname<br/><input type='text' onChange={this.UpdateSurname}/></label><br/>
                        <label>Eth Wallet <b>(Empty Wallet Preferred)</b><br/><input type='text' onChange={this.UpdateWallet}/></label><br/>
                        <label>Password<br/><input type='password' onChange={this.UpdateWorkerPassword}/></label><br/>
                        <label>Confirm Password<br/><input type='password' onChange={this.UpdateConfirmPassword}/></label><br/>
                        <br/>
                        
                        <button onClick={() => this.CheckRegister()}>Register</button>
                    </div>
                    <div className='register-status'>
                        {this.state.bUpdate ? this.ValidatePassword() : <div></div>}
                        {this.state.error}

                        {this.state.bSearch ? <div><CheckWorkerName workerName={this.state.workerName} workerPWD={this.state.workerPWD} workerFirstName={this.state.workerFirstName} workerLastName={this.state.workerLastName} workerWallet={this.state.workerWallet}/></div> : <div></div>}
                    </div>
                </div>
            );
        }
        
    }
}