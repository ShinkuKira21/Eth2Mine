import { NavLink } from 'react-router-dom';
import Main from './Main';
import './App.css';

function App() {	
  return (
	<div className='App'>
		<h1>Eth2Mine</h1>
		<Navigation />
		<Main />
	</div>
	);
}

const Navigation = () => (
	<nav className='navbar navbar-light bg-light'>
		<ul>
			<li className='navbar-brand mb-0 h1'><NavLink to='/'>Home</NavLink></li>
			{GetSession()[0] && GetSession()[1] ? <li className='navbar-brand mb-0 h1'><NavLink to='/statistics'>Statistics</NavLink></li> : null}
			{GetSession()[1] ? <li className='navbar-brand mb-0 h1'><NavLink to='/account'>Account</NavLink></li> :
			<span className='login'>
				<li className='navbar-brand mb-0 h1'><NavLink to='/account/login'>Login</NavLink></li>
				{/*<li className='navbar-brand mb-0 h1'><NavLink to='/account/register'>Register</NavLink></li>*/}
			</span>}
		</ul>
	</nav>
);

function GetSession()
{
	// Admin | LoggedIn
	var session = [false, false];
	return session;
}

export default App;