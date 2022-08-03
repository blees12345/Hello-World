import './NavbarStyles.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar(props) {
	return (
		<div className='header'>
			<Link to='/'>
				<h1 className='hello'>Hello World</h1>
			</Link>
			<ul className='nav-menu'>
				<li>
					<Link to='/map'>Map</Link>
				</li>
				<li>
					<Link to='/visitedcountries'>Visited Countries</Link>
				</li>
			</ul>

		</div>
	);
}

export default Navbar;
