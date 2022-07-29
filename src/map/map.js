import React, { useState, Fragment } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Geocode from 'react-geocode';

function MyComponent() {
	const [center, setCenter] = useState({
		lat: 37.52704598955056,
		lng: -3.7919273330000047,
	});
	Geocode.setLanguage('en');
	const [zoom, setZoom] = useState(2.7);
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs',
	});
	Geocode.setApiKey('AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs');
	const [show, setShow] = useState(false);
	const [click, setClick] = useState(null);
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [markerMap, setMarkerMap] = useState({});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [clickedLatLng, setClickedLatLng] = useState(null);
	const [mapRef, setMapRef] = useState(null);
	const mapMarker = [
		{ id: 'place1', pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
		{ id: 'place2', pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
		{ id: 'place3', pos: { lat: 39.07602397235644, lng: -94.5184089401211 } },
	];

	const markerLoadHandler = (marker, place) => {
		return setMarkerMap((prevState) => {
			return { ...prevState, [place.id]: marker };
		});
	};

	const markerClickHandler = (event, place) => {
		setSelectedPlace(place);
	};

	console.log(setSelectedPlace);
	const position = {
		lat: 37.772,
		lng: -122.214,
	};
	const loadHandler = (map) => {
		setMapRef(map);
	};
	const onLoad = (marker) => {
		console.log('marker: ', marker);
	};
	if (loadError) {
		return <div>Oops i did it again</div>;
	}

	Geocode.enableDebug();

	Geocode.fromLatLng('39.09366509575983', '-94.58751660204751').then(
		(response) => {
			const address = response.results[0].formatted_address;
			console.log(address);
		},
		(error) => {
			console.error(error);
		}
	);
	console.log(setClickedLatLng);

	Geocode.setLocationType('ROOFTOP');

	return isLoaded ? (
		<Fragment>
			<GoogleMap
				onLoad={loadHandler}
				onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
				center={center}
				zoom={zoom}
				mapContainerStyle={{
					height: '80vh',
					width: '100%',
				}}>
				<Marker onLoad={onLoad} position={position} />
				{mapMarker.map((place) => (
					<Marker
						key={place.id}
						position={place.pos}
						onLoad={(marker) => markerLoadHandler(marker, place)}
						onClick={(event) => markerClickHandler(event, place)}
						draggable={true}
					/>
				))}
				{mapMarker.map((item) => {
					return (
						<Marker
							animation='DROP'
							position={{ lat: item.lat, lng: item.lng }}
						/>
					);
				})}
			</GoogleMap>
			<Button variant='primary' onClick={handleShow}>
				Launch demo modal
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			{clickedLatLng && (
				<h3>
					clicked : {clickedLatLng.lat}, {clickedLatLng.lng}
				</h3>
			)}
		</Fragment>
	) : (
		<></>
	);
}

export default MyComponent;
