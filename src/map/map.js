import React, { useState, Fragment, useEffect } from 'react';
import {
	GoogleMap,
	Marker,
	useJsApiLoader,
	InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import './map.css';
import Navbar from '../Home/Navbar';

function MyComponent() {
	const [zoom] = useState(2.7);
	const [disableDefaultUI] = useState(true);
	const [center] = useState({
		lat: 37.52704598955056,
		lng: -3.7919273330000047,
	});
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	});
	const [clickedLatLng, setClickedLatLng] = useState(null);
	const [mapMarker, setMapMarker] = useState([]);
	const [infoWindow, setInfoWindow] = useState('');
	let mapMarkerShow = [];
	let getMapMarkerShow = localStorage.getItem('mapMarker');

	if (typeof getMapMarkerShow == 'string') {
		mapMarkerShow = JSON.parse(getMapMarkerShow);
	}
	let objLatLng;
	function createObjLatLng(object) {
		objLatLng = {
			pos: {
				lat: object.lat,
				lng: object.lng,
			},
		};
		let newArr = [...mapMarker, objLatLng];
		mapMarkerShow.push(objLatLng);
		localStorage.setItem('mapMarker', JSON.stringify(mapMarkerShow));
		setMapMarker(newArr);
	}
	function undoMarker(object) {
		objLatLng = {
			pos: {
				lat: object.lat,
				lng: object.lng,
			},
		};
		let newArr = [...mapMarker, objLatLng];
		mapMarkerShow.pop(objLatLng);
		localStorage.setItem('mapMarker', JSON.stringify(mapMarkerShow));
		setMapMarker(newArr);
	}

	Geocode.setApiKey(process.env.REACT_APP_API_MAP);
	const item = JSON.parse(localStorage.getItem('mapMarker'));
	const [address, setAddress] = useState([]);
	async function getAddresses() {
		const results = [];
		for (let i = 0; i < item.length; i++) {
			const response = await Geocode.fromLatLng(
				item[i].pos.lat,
				item[i].pos.lng
			);
			results.push(response.results[0].formatted_address);
		}
		setAddress(results);
		console.log(results);
	}

	useEffect(() => {
		getAddresses();
	}, []);
	if (loadError) {
		return <div>Oops i did it again</div>;
	}
	console.log('mapMarkerShow', mapMarkerShow);
	return isLoaded && address ? (
		<Fragment>
			<section className='container2'>
				<div>
					<Navbar />
					<br></br>
					<br></br>
					<br></br>
					<br></br>
				</div>
				<div></div>
				<GoogleMap
					onClick={(e) => {
						setClickedLatLng(e.latLng.toJSON());
						createObjLatLng(e.latLng.toJSON());
					}}
					center={center}
					zoom={zoom}
					disableDefaultUI={disableDefaultUI}
					mapContainerStyle={{
						height: '80vh',
						width: '100%',
					}}>
					{mapMarkerShow?.map((place, index) => (
						<Marker
							key={index}
							position={place.pos}
							draggable={false}
							onClick={() => {
								setInfoWindow(index);
							}}>
							{infoWindow === index && (
								<InfoWindow>
									<h3 className='info-window'>{address[index]}</h3>
								</InfoWindow>
							)}
						</Marker>
					))}
				</GoogleMap>
				
				<button className='btn-map' onClick={undoMarker}>Undo</button>
			</section>
		</Fragment>
	) : (
		<></>
	);
}

export default MyComponent;
