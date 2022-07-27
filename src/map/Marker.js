import React from 'react';

function Marker(options) {
	const [marker, setMarker] = useState();

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);
	useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);
	return null;

}

export default Marker;
