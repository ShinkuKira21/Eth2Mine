import React from 'react';
import Ethminer from './api/ethminer';
import Statistics from './pages/statistics';
import Account from './pages/account';
import aActions from './pages/account-actions/actions';
import aLogin from './pages/account-actions/login';
import aReg from './pages/account-actions/register';
import aLogOut from './pages/account-actions/logout';
import {Switch, Route } from 'react-router-dom';
import TandCs from './comps/TandCs';

const Home = () => (
<div className='coverpage'>
    <div className='jumbotron jumbotron-fluid jumbostyle'>
        <div className='container'>
	        <div className='eth2mine'>
		        <h1 class='cover-heading'>EtherMine</h1>
                <p className='lead'>Mining Threshold Before Payout!
                        <div className='pooldata'>
                            <Ethminer admin={false} />
                        </div>
                </p>
            </div>
        </div>
    </div>
    <div className='container'>
        <TandCs /> {/* Placeholder */}
    </div>
</div>
);

const Main = () => (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}/>
      <Route exact path='/statistics' component={Statistics}/>
      <Route exact path='/account' component={Account}/>
      <Route exact path='/account/login' component={aLogin}/>
      <Route exact path='/account/register' component={aReg}/>
      <Route exact path='/account/logout' component={aLogOut}/>
      <Route exact path='/account/action-changepwd' component={aActions}/>
    </Switch>
);

export default Main;