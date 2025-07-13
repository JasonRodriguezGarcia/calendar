import { Scheduler } from "@aldabil/react-scheduler";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";

const initialEvents = [
  {
    // principio campos por defecto que son obligatorios
    event_id: 1,
    title: "Reunión",
    subtitle: "Asamblea de majaras",
    start: new Date("2025-07-14T10:00:00"),
    end: new Date("2025-07-14T11:00:00"),
    // fin campos por defecto que son obligatorios
    descripcion: "Vaña peña que viene", // añadiendo campo adicional
    user_id: 1,
    color: "blue"
  },
];

function App() {

    const [events, setEvents] = useState(initialEvents)
    
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
                // cellRenderer: (props) => <div>{props.start.toLocaleTimeString()}</div>, // muestra la hora dentro de la celda
                // cellRenderer: (props) => { // colorea la celda pero se pierden props
                //     const hour = props.start.getHours();
                //     const backgroundColor = hour < 12 ? '#d1e7dd' : '#f8d7da'; // verde para la mañana, rojo para la tarde

                //     return (
                //        <div style={{backgroundColor, height: "95%"}}>props.color</div> // muestra la hora dentro de la celda
                //     )
                // },
                navigation: true,
                disableGoToDay: false
            }}
            day={{
                startHour: 7, 
                endHour: 21, 
                step: 60,
                hourRenderer: (hour) => <b>{hour}</b>, // esto sí funciona si deseas personalizar las horas al costado
                // cellRenderer: (props) => { // coge los props de la celda actual
                //     const hour = props.start.getHours();
                //     const backgroundColor = hour < 12 ? '#d1e7dd' : '#f8d7da'; // verde para la mañana, rojo para la tarde
                        
                //                     // Asegúrate de que children sea un único elemento React válido
                //     if (!props.children || !React.isValidElement(props.children)) return null;

                //     // Clona el contenido original de la celda y le añade estilo de fondo
                //     return React.cloneElement(props.children, {
                //         style: {
                //         ...props.children.props.style,
                //         backgroundColor
                //         }
                //     });
                // },
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
                    config: {
                        // label: "Título", // al ser un campo por defecto no lo usa anque se ponga
                        placeholder: "Escribe un Título",
                    },
                },
                {
                    name: "subtitle",
                    type: "input",
                    config: {
                        label: "Subtítulo",
                        placeholder: "Escribe un subtítulo",
                    },
                },
                {
                    name: "descripcion",
                    type: "input",
                    config: { 
                        label: "Descripción", multiline: true, minRows: 2 
                    },
                },
                {
                    name: "user_id",
                    type: "select",
                    // Should provide options with type:"select"
                    options: [
                        { id: 1, text: "John", value: 1 },
                        { id: 2, text: "Mark", value: 2 }
                    ],
                    config: { label: "Usuario", required: true, errMsg: "Plz Select User" }
                },

            ]}
            onConfirm={async (event, action) => {
                // Aquí tienes acceso a todos los campos, incluyendo "subtitle"
                console.log("Evento creado/editado:", event);

                // Puedes guardarlo en una API o base de datos aquí
                // Por ejemplo:
                // await fetch("/api/eventos", {
                //   method: "POST",
                //   body: JSON.stringify(event),
                // });

                if (action === "create") {
                    // Generar un nuevo event_id (puedes usar un contador o timestamp)
                    debugger
                    const newEventId = events.length > 0 
                        ? Math.max(...events.map(e => e.event_id)) + 1 
                        : 1;

                    const newEvent = {
                        ...event,
                        event_id: newEventId
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

                return event; // importante: devuelve el evento para que se muestre en el calendario
            }} 
            onDelete={async (deletedId) => {
                setEvents((prev) => prev.filter((e) => e.event_id !== deletedId));
                console.log("Evento eliminado correctamente:", deletedId);
            }}

        />
        
        </LocalizationProvider>
    );
}

export default App;
