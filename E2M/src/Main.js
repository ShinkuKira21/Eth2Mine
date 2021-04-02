import React from 'react';
import Ethminer from './api/ethminer';
import Statistics from './pages/statistics';
import Account from './pages/account';
import aLogin from './pages/login';
import aReg from './pages/register';
import ping from './comps/react-server'
import {Switch, Route } from 'react-router-dom';

const Home = () => (
	<div className='page-title'>
		<h1>EtherMine</h1>
    <Ethminer admin={false}/>
	</div>
);

const Main = () => (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}/>
      <Route exact path='/statistics' component={Statistics}/>
      <Route exact path='/account' component={Account}/>
      <Route exact path='/account/login' component={aLogin}/>
      <Route exact path='/account/register' component={aReg}/>
      <Route exact path='/ping' component={ping}/>
    </Switch>
);

export default Main;