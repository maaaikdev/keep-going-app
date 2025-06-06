import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RacesList from './components/RacesList/RacesList';
import CalendarRaces from './components/CalendarRaces/CalendarRaces';
import RaceDetail from './components/RaceDetail/RaceDetail';
import CalendarApp from './components/CalendarApp/CalendarApp';

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
		<div>

			{/* <CalendarRaces 
				races={races} 
				onSelectDate={(filtered) => setFilteredRaces(filtered)} 
			/> */}
			{/* <Routes>
				<Route path="/" element={<RacesList races={races} />} />
				<Route path="/evento/:id" element={<RaceDetail races={races} />} />
			</Routes> */}
			<CalendarApp />

			{/* <RacesList 
				races={races} 
				dateFilterCalendar={filteredRaces}
			/> */}
		</div>
	);
}

export default App;
