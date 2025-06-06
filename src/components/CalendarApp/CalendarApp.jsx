// 📁 src/components/CalendarApp.jsx
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
  parseISO
} from "date-fns";
import { es } from "date-fns/locale";

export default function CalendarApp() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState({
    "2025-05-22": [
    { title: "PLATZI LIVE", time: "16:00–17:00", color: "bg-green-500" },
    {
      title: "Globant Interview - WBD - Identity - Streamair",
      time: "14:00–14:45",
      color: "bg-gray-200",
      image: "https://picsum.photos/600/400"
    }
  ],
    "2025-05-23": [
      {
        title: "Tech Talk 2025 – Update MagnifAI",
        time: "16:00–17:30",
        color: "bg-blue-400",
        image: "https://picsum.photos/600/400",
        background: true
      },
      { title: "Moons appointment control", time: "15:00–16:00", color: "bg-red-400" },
      { title: "Another Event", time: "16:00–17:00", color: "bg-blue-400" },
      { title: "One more", time: "17:00–18:00", color: "bg-yellow-400" },
      { title: "Overflow 1", time: "18:00–19:00", color: "bg-pink-500" },
      { title: "Overflow 2", time: "19:00–20:00", color: "bg-purple-500" },
      { title: "Overflow 3", time: "20:00–21:00", color: "bg-orange-500" }
    ]
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", time: "", color: "bg-blue-500" });
  const [viewMode, setViewMode] = useState("row"); // "row" o "grid"

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const handleAddEvent = () => {
    const newEvents = { ...events };
    if (!newEvents[selectedDate]) newEvents[selectedDate] = [];
    newEvents[selectedDate].push({ ...formData });
    setEvents(newEvents);
    setFormData({ title: "", time: "", color: "bg-blue-500" });
    setShowForm(false);
  };

  const renderDayButton = (day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayEvents = events[dateStr] || [];
    const isSelected = selectedDate === dateStr;
    const maxVisibleDots = 2;
    const visibleDots = dayEvents.slice(0, maxVisibleDots);
    const hiddenCount = dayEvents.length - maxVisibleDots;

    return (
      <div
        key={dateStr}
        className={`rounded-full min-w-[2.5rem] h-10 flex items-center justify-center cursor-pointer transition-all text-sm ${
          isSelected ? "bg-blue-500" : isToday(day) ? "border border-blue-400" : ""
        }`}
        onClick={() => setSelectedDate(dateStr)}
      >
        <div className="relative">
          {format(day, "d")}
          {!isSelected && (
            <div className="absolute bottom-[-0.25rem] left-1/2 transform -translate-x-1/2 flex gap-[1px]">
              {visibleDots.map((e, i) => (
                <span key={i} className={`h-1 w-1 rounded-full ${e.color}`}></span>
              ))}
              {hiddenCount > 0 && (
                <span className="text-[0.5rem] text-gray-400 ml-[1px]">+{hiddenCount}</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const getVisibleEvents = () => {
    if (selectedDate && events[selectedDate]) {
      return [{ date: selectedDate, events: events[selectedDate] }];
    }
    return Object.entries(events).map(([date, list]) => ({ date, events: list }));
  };

  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{format(currentDate, "MMMM yyyy", { locale: es })}</h1>
        <button
          className="text-sm border px-2 py-1 rounded text-gray-200 border-gray-500 hover:bg-gray-700"
          onClick={() => setViewMode(viewMode === "grid" ? "row" : "grid")}
        >
          Cambiar a vista {viewMode === "grid" ? "fila" : "cuadrícula"}
        </button>

        {/* 🟡 Botón para limpiar selección */}
        {selectedDate && (
          <button
            className="ml-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
            onClick={() => setSelectedDate("")}
          >
            Limpiar selección
          </button>
        )}
      </div>

      {viewMode === "row" ? (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {daysInMonth.map(renderDayButton)}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
            <div key={d} className="text-sm text-gray-400">{d}</div>
          ))}
          {daysInMonth.map(renderDayButton)}
        </div>
      )}

      <div className="mt-2">
        {getVisibleEvents().length > 0 ? (
          getVisibleEvents().map(({ date, events }, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-gray-300">
                <div className="text-3xl font-bold">{format(parseISO(date), "d")}</div>
                <div className="uppercase text-sm">{format(parseISO(date), "EEEE", { locale: es })}</div>
              </div>
              <ul className="space-y-2">
  {events.map((e, i) => (
    <li
      key={i}
      className={`p-0 overflow-hidden rounded-lg text-black flex items-stretch shadow-md ${e.color || "bg-gray-200"}`}
    >
      {e.image ? (
        <img src={e.image} alt={e.title} className="w-20 object-cover" />
      ) : (
        <div className="w-1.5 bg-black/20"></div>
      )}
      <div className="flex flex-col justify-center px-3 py-2 w-full">
        <span className="font-semibold text-sm leading-tight">{e.title}</span>
        <span className="text-xs mt-1">{e.time}</span>
      </div>
    </li>
  ))}
</ul>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No hay eventos registrados.</p>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black rounded-xl p-4 w-11/12 max-w-md">
            <h2 className="font-bold text-lg mb-2">Agregar evento</h2>
            <input
              type="text"
              placeholder="Título"
              className="w-full border p-2 mb-2 rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Hora (ej: 14:00–15:00)"
              className="w-full border p-2 mb-2 rounded"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
              onClick={handleAddEvent}
            >
              Guardar
            </button>
            <button
              className="text-gray-600 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 text-3xl shadow-md"
        onClick={() => setShowForm(true)}
      >
        +
      </button>
    </div>
  );
}
