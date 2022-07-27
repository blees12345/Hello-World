import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const keys = 'AIzaSyDpJXpPXK9Y2YpDX0Xk_6Rp3bAo0TLnwOY';
const containerStyle = {
	width: '100vh',
	height: '100vh',
};

const center = {
	lat: -3.745,
	lng: -38.523,
};


function MyComponent() {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	});

	const [map, setMap] = React.useState(null);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<div>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}>
				{/* Child components, such as markers, info windows, etc. */}
			</GoogleMap>
			<>
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
			</>
		</div>
	) : (
		<></>
	);
	

	
}
export default React.memo(MyComponent);
