import React, { useState, useEffect } from 'react';

function VisitedCountries() {
    const [userData, setUserData] = useState([]);
    console.log('userData', userData);
    useEffect(() => {
        function checkUserData() {
            const item = JSON.parse(localStorage.getItem('mapMarker'));
            console.log('item', item);
            if (item) {
                setUserData(item);
            } else {
                setUserData('Default Value');
            }
        }
        checkUserData();
    }, []);
    return userData[0] ? (
        <>
            <h2>Lat: {userData[0].pos.lat}</h2>
            <h2>Long: {userData[0].pos.lng}</h2>
        </>
    ) : (
        null
    );
}

export default VisitedCountries;