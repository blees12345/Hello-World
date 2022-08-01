import React, { useState, Fragment } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyComponent() {
	const [zoom] = useState(2.7);
	const [center] = useState({
		lat: 37.52704598955056,
		lng: -3.7919273330000047,
	});
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	});
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [clickedLatLng, setClickedLatLng] = useState(null);
	const [mapMarker, setMapMarker] = useState([]);

	let mapMarkerShow = [];
	let getMapMarkerShow = localStorage.getItem('mapMarker');

	if (typeof getMapMarkerShow == 'string') {
		mapMarkerShow = JSON.parse(getMapMarkerShow);
	}
	console.log('mapMarkerShow', mapMarkerShow);

	function createObjLatLng(object) {
		let objLatLng = {
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
		let objLatLng = {
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

	if (loadError) {
		return <div>Oops i did it again</div>;
	}

	return isLoaded ? (
		<Fragment>
			<GoogleMap
				onClick={(e) => {
					setClickedLatLng(e.latLng.toJSON());
					createObjLatLng(e.latLng.toJSON());
				}}
				center={center}
				zoom={zoom}
				mapContainerStyle={{
					height: '80vh',
					width: '100%',
				}}>
				{mapMarkerShow?.map((place, index) => (
						<Marker
							key={index}
							position={place.pos}
							draggable={false}
						/>
				))}
			</GoogleMap>
			<Button variant='primary' onClick={handleShow}>
				Modal
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
					You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
				</h3>
			)}
			<button onClick={undoMarker}>Undo</button>
		</Fragment>
	) : (
		<></>
	);
}

export default MyComponent;