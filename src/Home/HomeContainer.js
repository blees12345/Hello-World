import React from 'react';
import Header from './Header';
import Body from './Body';
import '../utilities/reset.css';
import './HomeContainer.css';

function Home() {
    return (
        <div className="home-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="body-container">
                <Body />
            </div>
        </div>
    );
}

export default Home;