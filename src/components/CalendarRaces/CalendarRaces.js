import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarRaces.scss"; // Import the CSS file for styling



const CalendarRaces = ({ races, onSelectDate, onSelectDay }) => {

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

    // Cuando se selecciona una fecha
    const handleDateSelect = (date) => {

        const clickedDateStr = date.toISOString().split("T")[0];
        const clickedDay = date.toLocaleString("es-ES", { day: "2-digit"});
        const clickedMonth = date.toLocaleString("es-ES", { month: "long" });

        const monthEvents = races
            .filter((race) => {
            const raceDate = new Date(race.date + "T12:00:00");
            const raceMonth = raceDate.toLocaleString("es-ES", { month: "long" });
            return raceMonth === clickedMonth;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date));

            // Reorganizar colocando el clicado primero si existe 
        // const clickedEvent = monthEvents.find((race) => race.date === clickedDateStr);
        const clickedEvent = monthEvents.filter((race) => race.date === clickedDateStr);
        const otherEvents = monthEvents.filter((race) => race.date !== clickedDateStr);

        //const finalList = clickedEvent ? [clickedEvent, ...otherEvents] : monthEvents;
        const finalList = clickedEvent

        onSelectDay(clickedDay);
        onSelectDate(finalList);
    };

    const handleReset = () => {
        setSelectedDate(null);
        onSelectDate({ selectedEventId: null, events: races }); // 🔄 Muestra todas las carreras
         onSelectDay("");
    };

    const getEventsCount = (date) => {
        const dateStr = date.toISOString().split("T")[0];
        return races.filter((race) => race.date === dateStr).length;
    };

    const getEventTypesForDate = (date) => {
        const dateStr = date.toISOString().split("T")[0];
        return races
            .filter((race) => race.date === dateStr)
            .map((race) => race.type);
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
                // tileContent={({ date }) => {
                //     const count = getEventsCount(date);
                //     return count > 0 ? <div className="event-count">{count}</div> : null;
                // }}
                tileContent={({ date }) => {
                    const types = [...new Set(getEventTypesForDate(date))];
                    return types.length > 0 ? (
                    <div className="multi-type-indicators">
                        {types.includes("asfalto") && <span className="dot dot-asfalto"></span>}
                        {types.includes("trail") && <span className="dot dot-trail"></span>}
                    </div>
                    ) : null;
                }}
            />            
            <button onClick={handleReset} className="clean-selection">Limpiar selección</button>
        </div>
    );
      
}

export default CalendarRaces;