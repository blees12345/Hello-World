import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import './visitedCountries.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
function VisitedCountries() {
	const [userData, setUserData] = useState([]);
	useEffect(() => {
		function checkUserData() {
			const item = JSON.parse(localStorage.getItem('mapMarker'));
			if (item) {
				setUserData(item);
			} else {
				setUserData('Default Value');
			}
		}
		checkUserData();
	}, []);
	const item = JSON.parse(localStorage.getItem('mapMarker'));
	Geocode.setApiKey(process.env.REACT_APP_API_MAP);
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
	}

	useEffect(() => {
		getAddresses();
	}, []);

	const allNotes = [];
	const [show, setShow] = useState(false);
	const [notes, setNotes] = useState('');
	const [newNote, setNewNote] = useState([allNotes]);
	const handleChange = (e) => {
		setNotes(e.target.value);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(notes);
		const updatedNotes = [...newNote, notes];
		setNewNote(updatedNotes);
		setNotes('');
	};

	console.log(newNote);
	return address[0] ? (
		<section className='container'>
			<div className='inner-container'>
				<h1 className='title'>Visited Countries</h1>
				<div className='countries-list'>
					{address.map((address) => (
						<div className='address'>{address}</div>
					))}
				</div>
				{/* <div>{notes.map((notes) => (<div className='notes'>{notes}</div>))}</div> */}
			</div>

			<Button variant='primary' onClick={handleShow}>
				Add Notes
			</Button>

			<Modal show={show} onHide={handleClose} onChange={handleChange}>
				<Modal.Header closeButton>
					<Modal.Title>Notes </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlInput1'></Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'>
							<Form.Label>Favorite activities</Form.Label>
							<Form.Control type='text' onChange={handleChange} value={notes} />
						</Form.Group>
						<Button
							variant='primary'
							// onClick={handleClose}
							onSubmit={handleSubmit}
							type='submit'>
							Save Changes
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</section>
	) : null;
}

export default VisitedCountries;
