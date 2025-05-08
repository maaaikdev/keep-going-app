import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarRaces.scss"; // Import the CSS file for styling



const CalendarRaces = ({ races, onSelectDate }) => {

    const [rangeValue, setRangeValue] = useState(null);

    const raceDates = races.map(d => new Date(d.fecha).toDateString());

    const tileClassName = ({ date}) => {
        if(raceDates.includes(date.toDateString())) {
            return 'highlight';
        }
        return null;
    };

    // ✅ Validar que la fecha sea válida antes de pasarla a Calendar
    const getValidDate = (date) => {
        const d = new Date(date);
        return isNaN(d) ? new Date() : d;
    };

    const handleApply = () => {
        if (!rangeValue || !Array.isArray(rangeValue)) return;
        console.log("rangeValue", rangeValue);

        const [start, end] = rangeValue;
        const filtered = races.filter((race) => {
            const raceDate = new Date(race.date + "T12:00:00");
            return raceDate >= start && raceDate <= end;
        });

        console.log("filtered", filtered);

        onSelectDate(filtered); // 🔥 envía carreras filtradas
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
        <>
            <h2>Calendario</h2>
            <Calendar 
                selectRange={true}
                tileClassName={tileClassName}
                value={rangeValue || undefined}
                onChange={setRangeValue}
                onClickDay={(date) => onSelectDate(date.toISOString().split("T")[0])}
            />
            {/* <Calendar 
                selectRange={true}
                tileClassName={tileClassName}
                value={rangeValue || getValidDate(onSelectDate)}
                onChange={setRangeValue}
                onClickDay={(date) => onSelectDate(date.toISOString().split("T")[0])}
            /> */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <button onClick={() => setRangeValue(null)} style={resetStyle}>Reset</button>
                <button onClick={handleApply} style={applyStyle}>Apply</button>
            </div>
            <style>{`
                .highlight {
                    background: orange !important;
                    color: white;
                    border-radius: 50%;
                }
            `}</style>
        </>
    );
      
}

export default CalendarRaces;