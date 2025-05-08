import './App.css';
import { useEffect, useState } from 'react';
import RacesList from './components/RacesList/RacesList';
import CalendarRaces from './components/CalendarRaces/CalendarRaces';

function App() {
	const [races, setRaces] = useState([]);
	const [selectedDate, setSelectedDate] = useState("");
	const [filteredRaces, setFilteredRaces] = useState(null);

	useEffect(() => {
		fetch("/data/races.json")
			.then((res) => res.json())
			.then((data) => {
				setRaces(data)
			})
			.catch((err) => {
				console.error("Error fetching data:", err);
			});
	}, [])

	return (
		<div style={{ padding: 24 }} >
			<CalendarRaces 
				races={races} 
				onSelectDate={(filtered) => setFilteredRaces(filtered)} 
			/>
			<RacesList 
				races={races} 
				dateFilterCalendar={filteredRaces}
			/>
		</div>
	);
}

export default App;
