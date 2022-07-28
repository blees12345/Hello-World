import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Icon from '../icons8-place-marker-16.png'
import cors from 'cors'

function MyComponent() {
	const [center, setCenter] = useState({
		lat: 37.52704598955056,
		lng: -3.7919273330000047,
	});
	const [zoom, setZoom] = useState(2.7);
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs',
	});
	const [show, setShow] = useState(false);
	const [click, setClick] = useState(null)
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [markerMap, setMarkerMap] = useState({});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
    // Remember which place was clicked
    setSelectedPlace(place);
	}

	const position = {
		lat: 37.772,
		lng: -122.214,
	};

	const onLoad = (marker) => {
		console.log('marker: ', marker);
	};
	if (loadError) {
		return <div>Oops i did it again</div>
	}



	return isLoaded ? (
		<>
			<GoogleMap
				center={center}
				zoom={zoom}
				mapContainerStyle={{
					height: '100vh',
					width: '100%',
				}}>
				<Marker onLoad={onLoad} position={position} />
				{mapMarker.map((place) => (
					<Marker
						key={place.id}
						position={place.pos}
						onLoad={marker => markerLoadHandler(marker, place)}
						onClick={(event) => markerClickHandler(event, place)}
						icon={Icon}
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
		</>
	) : (
		<></>
	);
}

export default MyComponent;
