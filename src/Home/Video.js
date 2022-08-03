import React from 'react';
import './VideoStyles.css';
import spaceVideo from '../assets/Rotation of The Planet Earth.mp4';
import { Link } from 'react-router-dom';

function Video() {
	return (
		<div className='hero'>
			<video autoPlay loop muted id='video'>
				<source src={spaceVideo} type='video/mp4' />
			</video>
			<div className='content'>
				<h1>Hello World</h1>
				<br></br>
				<div>
					<Link to='/map' className='btn'>
						Get Started
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Video;
