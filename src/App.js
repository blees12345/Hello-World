import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home/HomeContainer';
import Body from './Home/Body';
import VisitedCountries from './visitedCountries/visitedCountries';
import Map from './map/map'
import './utilities/reset.css';
import './App.css';
// import HellowWorld from './Utilities/Hello-World.jpeg';

function App() {
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
