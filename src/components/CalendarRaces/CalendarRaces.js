import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarRaces.scss"; // Import the CSS file for styling



const CalendarRaces = ({ races, onSelectDate }) => {

    //const [rangeValue, setRangeValue] = useState(null); //TODO Code to range dates
    const [selectedDate, setSelectedDate] = useState(null);

    //const raceDates = races.map(d => new Date(d.fecha).toDateString());
    const eventDates = races.map((d) => d.date); 
    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split("T")[0];
        //return eventDates.includes(dateStr) ? "event-day" : null;
        const racesThatDay = races.filter((race) => race.date === dateStr);

        if (racesThatDay.length > 0) {
            const types = racesThatDay.map((r) => r.type);

            if (types.includes("trail")) return "event-trail";
            if (types.includes("asfalto")) return "event-running";
        }

        return null;
    };

    // ✅ Validar que la fecha sea válida antes de pasarla a Calendar
    const getValidDate = (date) => {
        const d = new Date(date);
        return isNaN(d) ? new Date() : d;
    };

    // const handleApply = () => { //TODO Code to range dates
    //     if (!rangeValue || !Array.isArray(rangeValue)) return;
    //     console.log("rangeValue", rangeValue);

    //     const [start, end] = rangeValue;
    //     const filtered = races.filter((race) => {
    //         const raceDate = new Date(race.date + "T12:00:00");
    //         return raceDate >= start && raceDate <= end;
    //     });

    //     console.log("filtered", filtered);

    //     onSelectDate(filtered); // 🔥 envía carreras filtradas
    // };

    // Cuando se selecciona una fecha
    const handleDateSelect = (date) => {
        // const formattedDate = date.toISOString().split("T")[0];
        // setSelectedDate(formattedDate);

        // // Filtra los eventos de ese día
        // const filtered = races.filter((race) => race.date === formattedDate);

        // // Devuelve los eventos filtrados
        // onSelectDate(filtered);

        // const selectedMonth = date.toLocaleString("es-ES", { month: "long" });

        // const monthEvents = races.filter((race) => {
        //     const raceDate = new Date(race.date + "T12:00:00");
        //     const raceMonth = raceDate.toLocaleString("es-ES", { month: "long" });
        //     return raceMonth === selectedMonth;
        // });

        // onSelectDate(monthEvents); // Enviar eventos del mes al padre

        const clickedDateStr = date.toISOString().split("T")[0];
        const clickedMonth = date.toLocaleString("es-ES", { month: "long" });

        const monthEvents = races
            .filter((race) => {
            const raceDate = new Date(race.date + "T12:00:00");
            const raceMonth = raceDate.toLocaleString("es-ES", { month: "long" });
            return raceMonth === clickedMonth;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Reorganizar colocando el clicado primero si existe
        const clickedEvent = monthEvents.find((race) => race.date === clickedDateStr);
        const otherEvents = monthEvents.filter((race) => race.date !== clickedDateStr);

        const finalList = clickedEvent ? [clickedEvent, ...otherEvents] : monthEvents;

        onSelectDate(finalList);
    };

    const handleReset = () => {
        setSelectedDate(null);
        onSelectDate({ selectedEventId: null, events: races }); // 🔄 Muestra todas las carreras
    };

    const resetStyle = {
        background: "transparent",
        border: "none",
        color: "#5e35b1",
        fontWeight: "bold",
        fontSize: "1rem",
    };
    
    const applyStyle = {
        background: "#5e35b1",
        border: "none",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "12px",
        padding: "0.5rem 1.5rem",
    };

    return (
        <div className="calendar-comp">
            <h2>Calendario</h2>
            <div className="calendar-legend">
                <span className="legend-item">
                    <span className="color-box event-running"></span> Running (Asfalto)
                </span>
                <span className="legend-item">
                    <span className="color-box event-trail"></span> Trailrunning
                </span>
            </div>
            <Calendar
                tileClassName={tileClassName}
                value={selectedDate ? new Date(selectedDate + "T12:00:00") : undefined}
                onChange={handleDateSelect}
            />            
            <button onClick={handleReset} className="clean-selection">Limpiar selección</button>
        </div>
    );
      
}

export default CalendarRaces;