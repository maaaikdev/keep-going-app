
import { useState } from "react";
import { Link } from "react-router-dom";
import "./RacesList.scss"; // Import the CSS file for styling
import CalendarRaces from "../CalendarRaces/CalendarRaces";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const RacesList = ({ races}) => {

    console.log("races", races)

    const [search, setSearch] = useState(""); //TODO searching...
    //const [dateFilter, setDateFilter] = useState("");   //TODO filter by date
    const [typeFilter, setTypeFilter] = useState("");   //TODO filter by type
    const [distanceFilter, setDistanceFilter] = useState("");   //TODO filter by distance
    const [placeFilter, setPlaceFilter] = useState("");   //TODO filter by distance
    const [filteredRaces, setFilteredRaces] = useState(null);

    const visibleRaces = Array.isArray(filteredRaces) && filteredRaces.length > 0
    ? filteredRaces
    : races;
    
    const racesFilter = visibleRaces.filter((race) => {
        const matchName = race.name.toLowerCase().includes(search.toLowerCase());
        //const matchDate = dateFilterCalendar === "" || race.date === dateFilterCalendar;
        const matchType = typeFilter === "" || race.type === typeFilter;
        const matchDistance = distanceFilter === "" || race.distances.includes(Number(distanceFilter));
        const matchPlace = placeFilter === "" || race.city.toLowerCase().includes(placeFilter.toLowerCase()) || race.departament.toLowerCase().includes(placeFilter.toLowerCase());
        return matchName && matchType && matchDistance && matchPlace;
    });

    // Card design: 
    function getDate(date) {
        return new Date(date + "T12:00:00")
    }

    // ✅ Agrupar carreras por mes
    const groupByMonth = (racesArray) => {
        const grouped = {};
        racesArray.forEach((race) => {
            const date = getDate(race.date);
            const month = date.toLocaleString("es-ES", { month: "long" });
            if (!grouped[month]) grouped[month] = [];
                grouped[month].push(race);
        });
        return grouped;
    };

    const groupedRaces = groupByMonth(racesFilter);

    const monthOrder = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const currentMonthIndex = new Date().getMonth();
    console.log("currentMonthIndex", currentMonthIndex);
    const orderedMonths = [
        ...monthOrder.slice(currentMonthIndex),
        ...monthOrder.slice(0, currentMonthIndex)
    ];
    
    console.log("orderedMonths", orderedMonths);
    const orderedGroupedRaces = orderedMonths
        .filter((month) => groupedRaces[month])
        .map((month) => [month, groupedRaces[month]]);
    
    console.log("orderedGroupedRaces", orderedGroupedRaces);

    return (
        <>
            <h2>Listado de Carreras</h2>

            <CalendarRaces 
				races={races} 
				onSelectDate={(filtered) => setFilteredRaces(filtered)} 
			/>

            {/* <input
                type="text"
                placeholder="Buscar por nombre"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }}
            /> */}

             {/* =================================== */}
            {/* <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }} 
            /> */}

            
            {/* =================================== */}
            {/* <input
                type="date"
                value={dateFilterCalendar}
                onChange={(e) => onDateChange(e.target.value)}
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }} 
            />
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }}
            >
                <option value="">Seleccionar tipo</option>
                <option value="trail">Trailrunning</option>
                <option value="asfalto">Running</option>
                <option value="ultra">Ultra</option>
            </select>
            <input 
                type="number" 
                placeholder="Distance en km" 
                value={distanceFilter} 
                onChange={(e) => setDistanceFilter(e.target.value)}
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }}
            />
            <input 
                type="text" 
                placeholder="Lugar"
                value={placeFilter} 
                onChange={(e) => setPlaceFilter(e.target.value)} 
                style={{ marginBottom: 10, padding: 5, width: "-webkit-fill-available" }}
            /> */}
            
            {orderedGroupedRaces.map(([month, monthRaces]) => (
                <div key={month} className="carrusel-container">
                    <h3 className="month-title">{capitalizeFirstLetter(month)}</h3>
                    <div className="cards-scroll">
                        {monthRaces.map((race) => (
                            <div key={race.id} 
                                className="box-card"
                                style={{
                                    border:
                                        Array.isArray(filteredRaces) &&
                                        filteredRaces.length > 0 &&
                                        race.id === filteredRaces[0]?.id
                                            ? "3px solid orange"
                                            : "1px solid #eaeaea",
                                        borderRadius: "12px",
                                }}
                            >
                                <img src={race.image} alt={race.name} />
                                <div className="banner-card">
                                    <div className="date-event">
                                        <span className="day">{getDate(race.date).getDate()}</span>
                                    </div>
                                    <h3>{race.name}</h3>
                                    <p>Tipo: <strong>{race.type}</strong></p>
                                    <p>Distancias:{" "} <strong>{race.distances.join(", ")} km</strong></p>
                                    <p>Ciudad: <strong>{race.city}, {race.departament}</strong></p>
                                    {/* <a
                                        href={race.registrationURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-registration"
                                    >
                                        Registration
                                    </a> */}
                                    <Link to={`/evento/${race.id}`} className="btn-registration">Ver Detalle</Link>
                                    <div className="icon">♡</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

export default RacesList;