import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home/HomeContainer';
import VisitedCountries from './visitedCountries/visitedCountries';
import Map from './map/map';
import Navbar from './Home/Navbar';
// import './utilities/reset.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './utilities/Screen Shot 2022-07-31 at 7.56.19 PM.png';

function App() {
	return (
		<>
			{/* <Navbar/> */}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/map' element={<Map />} />
				<Route path='/visitedcountries' element={<VisitedCountries />} />
			</Routes>
		</>
	);
}

export default App;
