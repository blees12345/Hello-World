import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import './visitedCountries.css';

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
    Geocode.setApiKey('AIzaSyDhQrJh-xh1tjc1yA9Oma4BveFGMPkGeKs');
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

    return address[0] ? (
        <section className='container'>
            <div className='inner-container'>
                <h1 className='title'>Visited Countries</h1>
                <div className='countries-list'>
                    {address.map((address) => (
                        <div className='address'>{address}</div>
                    ))}
                </div>
            </div>
        </section>
    ) : null;
}

export default VisitedCountries;
