import { NavLink } from 'react-router-dom';
import Main from './Main';
import './App.css';
import {ReactSession} from 'react-client-session';

function App() {
  ReactSession.setStoreType('localStorage');
  
  return (
	<div className='App'>
		<Navigation />
		<Main />
	</div>
	);
}

const Navigation = () => (

	<nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
		<NavLink to='/'>
			<li className="navbar-brand mb-0 h1">Eth2Mine</li>
		</NavLink>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarToggler">
			<ul className="navbar-nav mr-auto mt-2  mt-lg-0">
					<NavLink to='/'>
						<li className="nav-link">Home
							</li>
						
					</NavLink>
				
				{GetSession()[0] && GetSession()[1] ?
					<NavLink to='/statistics'>
						<li className='nav-link'>
							Statistics
							<span className="sr-only">(current)</span>
						</li>
					</NavLink>
					: null}
			</ul>
				{GetSession()[1] ?
				<ul className="navbar-nav ml-lg-auto mr-auto mr-lg-0 my-2 mr-4">
						<NavLink to='/account'>
						<li className='d-lg-inline d-xs-block nav-link'>Account</li>
						</NavLink>
						<NavLink to='/account/logout'>
						<li className='d-lg-inline d-xs-block center nav-link'>Log Out</li>
						</NavLink>
					</ul> : 
				
					<span>
						<NavLink to='/account/login'>
						<li className='d-lg-inline d-xs-block center nav-link'>Login</li>
						</NavLink>
						{<NavLink to='/account/register'>
						<li className='d-lg-inline d-xs-block center nav-link'>Register</li>
						</NavLink>}
					</span>}
  </div>
</nav>


/*
	<nav className='navbar navbar-light bg-light'>
		<ul>
			<li className='navbar-brand mb-0 h1'><NavLink to='/'>Home</NavLink></li>
			{GetSession()[0] && GetSession()[1] ? <li className='navbar-brand mb-0 h1'><NavLink to='/statistics'>Statistics</NavLink></li> : null}
			{GetSession()[1] ? 
				<span>
					<li className='navbar-brand mb-0 h1'><NavLink to='/account'>Account</NavLink></li> 
					<li className='navbar-brand mb-0 h1'><NavLink to='/account/logout'>Log Out</NavLink></li>
				</span>:
				
			<span className='login'>
				<li className='navbar-brand mb-0 h1'><NavLink to='/account/login'>Login</NavLink></li>
				{<li className='navbar-brand mb-0 h1'><NavLink to='/account/register'>Register</NavLink></li>}
			</span>}
		</ul>
	</nav>
	*/
);

function GetSession()
{
	// Admin | LoggedIn
	var session = [ReactSession.get("execAuthentication"), ReactSession.get("authentication")];
	return session;
}

export default App;