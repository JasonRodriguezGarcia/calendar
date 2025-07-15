import { Scheduler } from "@aldabil/react-scheduler";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";

const initialEvents = [
  {
    event_id: Date.now(), // ✅ ID generado una sola vez al cargar
    title: "Reunión",
    subtitle: "Asamblea de majaras",
    start: new Date("2025-07-14T10:00:00"),
    end: new Date("2025-07-14T11:00:00"),
    descripcion: "Vaña peña que viene",
    user_id: 1,
    color: "blue"
  },
];

function App() {
  const [events, setEvents] = useState(initialEvents);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Scheduler
        view="week"
        week={{
          weekDays: [0, 1, 2, 3, 4],
          weekStartOn: 1,
          startHour: 7,
          endHour: 21,
          step: 60,
          navigation: true,
          disableGoToDay: false
        }}
        day={{
          startHour: 7,
          endHour: 21,
          step: 60,
          hourRenderer: (hour) => <b>{hour}</b>,
          navigation: true,
        }}
        events={events}
        editable
        deletable
        draggable
        style={{ height: "100vh", width: "100%" }}
        fields={[
          {
            name: "title",
            type: "input",
            config: { placeholder: "Escribe un Título" },
          },
          {
            name: "subtitle",
            type: "input",
            config: { label: "Subtítulo", placeholder: "Escribe un subtítulo" },
          },
          {
            name: "descripcion",
            type: "input",
            config: { label: "Descripción", multiline: true, minRows: 2 },
          },
          {
            name: "user_id",
            type: "select",
            options: [
              { id: 1, text: "John", value: 1 },
              { id: 2, text: "Mark", value: 2 }
            ],
            config: { label: "Usuario", required: true, errMsg: "Selecciona un usuario" }
          }
        ]}
        onConfirm={async (event, action) => {
          if (!event.title?.trim()) {
            alert("El título es obligatorio.");
            return null;
          }

          if (!event.user_id) {
            alert("Debes seleccionar un usuario.");
            return null;
          }

          if (action === "create") {
            // ✅ Generar un ID único combinando timestamp + aleatorio
            let newEventId = Date.now() + Math.floor(Math.random() * 100000);

            // Asegurarse que no se repita
            while (events.some(e => e.event_id === newEventId)) {
              newEventId = Date.now() + Math.floor(Math.random() * 100000);
            }

            const newEvent = {
              ...event,
              event_id: newEventId,
              start: new Date(event.start),
              end: new Date(event.end),
              title: event.title || "Nuevo Evento",
              subtitle: event.subtitle || "",
              descripcion: event.descripcion || "",
              user_id: event.user_id || null,
              color: "blue"
            };

            setEvents(prev => [...prev, newEvent]);
            console.log("Evento creado:", newEvent);
            return newEvent;
          }

          if (action === "edit") {
            const updatedEvents = events.map(e =>
              e.event_id === event.event_id ? { ...e, ...event } : e
            );
            setEvents(updatedEvents);
            console.log("Evento editado:", event);
            return event;
          }

          return event;
        }}
        onDelete={async (deletedId) => {
          setEvents(prev => prev.filter(e => e.event_id !== deletedId));
          console.log("Evento eliminado correctamente:", deletedId);
        }}
      />
    </LocalizationProvider>
  );
}

export default App;
