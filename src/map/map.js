import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyComponent() {
	const [center, setCenter] = useState({ lat: 37.52704598955056, lng: -3.7919273330000047 });
	const [zoom, setZoom] = useState(2.7);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyDpJXpPXK9Y2YpDX0Xk_6Rp3bAo0TLnwOY",
	});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [show, setShow] = useState(false);
	return isLoaded ? (
		<>
			<GoogleMap
				center={center}
				zoom={zoom}
				mapContainerStyle={{
					height: "90vh",
					width: "100%"
				}}>
				<Marker>

				</Marker>
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
			</Modal >
		</>
	) : (
		<></>
	);
}

export default MyComponent;
