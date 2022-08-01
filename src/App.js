import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Body from './Home/Body';
import VisitedCountries from './visitedCountries/visitedCountries';
import Map from './map/map';
import './utilities/reset.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './utilities/Screen Shot 2022-07-31 at 7.56.19 PM.png';

function App() {
	return (
		<section className='main-container'>
			<nav className='nav-container'>
				<ul className='link-container'>
					<li className="left-link">
						___________________________________________
					</li>
					<li className='pic-lib-link'>
						<Link to='/visitedCountries' className="visited-link">Your Markers</Link>
					</li>
					<Link to='/'>
						<img className='logo-container' src={logo} alt='Hello World Logo' />
					</Link>
					<li className='pic-lib-link'>
						<Link to='/map' className="map-link">Your Map</Link>
					</li>
					<li className="right-link">
						___________________________________________
					</li>
				</ul>
			</nav>
			<main className="main">
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
