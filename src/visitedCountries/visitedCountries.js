import React, { useState, useEffect } from 'react';

function VisitedCountries(props) {
    const [userData, setUserData] = useState('default user data');

    useEffect(() => {
        function checkUserData() {
            const item = localStorage.getItem('mapMarker');
            if (item) {
                setUserData(item);
            } else {
                setUserData('Default Value');
            }
        }
        checkUserData();
        window.addEventListener('storage', checkUserData);
        return () => {
            window.removeEventListener('storage', checkUserData);
        };
    }, []);
    return (
        <h2>{userData}</h2>
    );
}

export default VisitedCountries;