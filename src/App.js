import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Body from './Home/Body';
import VisitedCountries from './visitedCountries/visitedCountries';
import Map from './map/map';
import './utilities/reset.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

function App() {
	function Storage() {
		// Similar to useState but first arg is key to the value in local storage.
		const [name, setName] = useLocalStorage('name', 'Bob');
		return (
			<div>
				<input
					type='text'
					placeholder='Enter your name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
		);
	}
	// Hook
	function useLocalStorage(key, initialValue) {
		const [storedValue, setStoredValue] = useState(() => {
			if (typeof window === 'undefined') {
				return initialValue;
			}
			try {
				const item = window.localStorage.getItem(key);
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				console.log(error);
				return initialValue;
			}
		});
		const setValue = (value) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== 'undefined') {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.log(error);
			}
		};
		return [storedValue, setValue];
	}

	return (
		<section className='main-container'>
			<nav className='nav-container'>
				<div className='logo-container-main'>
					<Link to='/'>
						{/* <img className='logo-container' src={} alt='' /> */}
					</Link>
				</div>
				<ul className='link-container'>
					<li className='link pic-lib-link'>
						<Link to='/visitedCountries'>Visited Countries</Link>
					</li>
					<li className='link pic-lib-link'>
						<Link to='/map'>Map</Link>
					</li>
				</ul>
			</nav>
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/body' element={<Body />} />
					<Route path='/visitedcountries' element={<VisitedCountries />} />
					<Route path='/map' element={<Map />} />
				</Routes>
			</main>
		</section>
	);
}

export default App;
