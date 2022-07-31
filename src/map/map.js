import React, { useState, Fragment } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Geocode from 'react-geocode';

function MyComponent() {
	const [zoom] = useState(2.7);
	const [center] = useState({
		lat: 37.52704598955056,
		lng: -3.7919273330000047,
	});
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs',
	});
	Geocode.setApiKey('AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs');
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
	console.log("mapMarkerShow", mapMarkerShow)

	function createObjLatLng(object) {
		let objLatLng = {
			pos: {
				lat: object.lat,
				lng: object.lng,
			},
		};
		let newArr = [...mapMarker, objLatLng];
		mapMarkerShow.push(objLatLng);
		localStorage.setItem('mapMarker', JSON.stringify(mapMarkerShow))
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
				{mapMarker?.map((place) => (
					<Marker
						key={place.id}
						position={place.pos}
						draggable={true} // should be false, latlng does not change when dragged
					/>
				))}
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
					You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
				</h3>
			)}
		</Fragment>
	) : (
		<></>
	);
}

export default MyComponent;
