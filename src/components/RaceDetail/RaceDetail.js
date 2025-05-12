import { useParams, Link } from "react-router-dom";
import "./RaceDetail.scss";
import { IoCalendarClearSharp, IoCompass, IoTicket, IoSwapHorizontal } from "react-icons/io5";
import  capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import MapView from "../MapView/MapView";


const RaceDetail = ({ races }) => {
    const { id } = useParams();
    const race = races.find((r) => r.id === id);
    console.log("race detail", race);
    const position = [race.location.lat, race.location.lng];
    console.log("position", position);

    if (!race) return <p>Evento no encontrado</p>;

    return (
        <div className="event-detail">
            <div className="event-header">
                <img src={race.image} alt={race.name} />
            </div>

            <div className="event-content">
                <h1>{race.name}</h1>

                <div className="event-info">
                    <div className="event-type">
                        <div className="icon-details"><IoCalendarClearSharp /></div>
                        <p>{capitalizeFirstLetter(new Date(race.date + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}</p>
                    </div>
                    <div className="event-type">
                        <div className="icon-details"><IoCompass /></div>
                        <p>{capitalizeFirstLetter(race.city)}, {capitalizeFirstLetter(race.departament) }</p>
                    </div>
                    <div className="event-type">
                        <div className="icon-details"><IoSwapHorizontal /></div>
                        <p>{race.distances.join(", ")} km</p>
                    </div>
                    <div className="event-type">
                        <div className="icon-details"><IoTicket /></div>
                        <p>Desde: {race.price || "Sin costo"}</p>
                    </div>
                </div>

                <MapView position={position} label={race.city} />

                <div className="event-about">
                    <h3>Sobre el Evento</h3>
                    <p>{race.description || "Próximamente más información."}</p>
                </div>

                <button href={race.registrationURL} target="_blank" rel="noopener noreferrer" className="btn-register">
                    Comprar Tickets
                </button>

                <Link to="/" className="back-link">Volver</Link>
            </div>
        </div>
    );
};

export default RaceDetail;