import { useState } from 'react';
function App() {
	// Similar to useState but first arg is key to the value in local storage.
	const [name, setName] = useLocalStorage('name', 'Bob');
	return (
		<div>
			<input
				type='text'
				placeholder='Enter your name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	);
}
// Hook
function useLocalStorage(key, initialValue) {

	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});
	const setValue = (value) => {
		try {
		
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue];
}
