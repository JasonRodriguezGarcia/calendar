import { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const initialEvents = [
  {
    // principio campos por defecto que son obligatorios
    event_id: 1,
    title: "Reunión",
    start: new Date("2025-07-10T10:00:00"),
    end: new Date("2025-07-10T11:00:00"),
    // fin campos por defecto que son obligatorios
    descripcion: "Revisión del sprint actual" // añadiendo campo adicional
  },
];


function App() {

    const [events, setEvents] = useState(initialEvents)
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Scheduler
            view="week"
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

                return event; // importante: devuelve el evento para que se muestre en el calendario
            }} 
        /> */}
            <Scheduler
                events={events}
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
            ]}

                view="week"
                editable
                // editable = {false}
                deletable
                // deletable = {false}
                onDelete={async (deletedId) => {
                    // Puedes hacer una llamada al backend para eliminarlo
                    try {
                        // const response = await fetch(`http://localhost:3000/api/eventos/${deletedId}`, {
                            //     method: "DELETE"
                    // });
                    
                    // if (!response.ok) {
                        //     throw new Error("No se pudo eliminar el evento");
                        // }
                        console.log("Evento eliminado:", deletedId);

                        console.log("Evento eliminado correctamente:", deletedId);
                        setEvents((prev) => prev.filter((e) => e.event_id !== deletedId));

                    } catch (error) {
                        console.error("Error al eliminar el evento:", error);
                        alert("Error al eliminar el evento.");
                    }

                }}
                viewerExtraComponent={(fields, event) => (
                    <div style={{ padding: 8 }}>
                        <p><strong>Subtítulo:</strong> {event.subtitle}</p>
                        <p><strong>Descripción:</strong> {event.descripcion}</p>
                    </div>
                )}

                draggable

                customEditor={({ event, onConfirm, close }) => {
                    const [formData, setFormData] = useState({
                        title: event?.title || "",
                        subtitle: event?.subtitle || "",
                        descripcion: event?.descripcion || "",
                        start: event?.start || new Date(),
                        end: event?.end || new Date()
                    });

                    const handleChange = (field, value) => {
                        setFormData((prev) => ({ ...prev, [field]: value }));
                    };

                    const handleSubmit = async (e) => {
                        e.preventDefault();
                        const newEvent = {
                        event_id: event?.event_id || Date.now(),
                        ...formData
                        };
                        
                        // Notas importantes:
                        // Si estás creando un nuevo evento, usa POST.
                        // Si estás editando un evento existente (tiene event_id), usa PUT o PATCH.
                        // Puedes cambiar "http://localhost:3000/api/eventos" por la URL real de tu API.
                        // onConfirm(newEvent) es necesario para que el evento aparezca en el calendario visualmente.
                        // Siempre maneja errores con try/catch.

                        try {
                            // 🔄 Llamada al backend
                            // const response = await fetch("http://localhost:3000/api/eventos", {
                            //     method: event?.event_id ? "PUT" : "POST", // usa PUT para editar
                            //     headers: {
                            //         "Content-Type": "application/json",
                            //     },
                            //     body: JSON.stringify(newEvent),
                            // });

                            // if (!response.ok) {
                            // throw new Error("Error al guardar el evento");
                            // }

                            // ✅ Actualiza el calendario
                            onConfirm(newEvent);
                            close();

                        } catch (error) {
                            console.error("Error al enviar al backend:", error);
                            alert("Ocurrió un error al guardar el evento.");
                        }
                    };

                    return (
                        <form onSubmit={handleSubmit} style={{ padding: 16 }}>
                            <div style={{ marginBottom: 10 }}>
                                <label>Título:</label>
                                <input
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder="Título"
                                style={{ width: "100%" }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginBottom: 10 }}>
                                <div style={{ flex: 1 }}>
                                <label>Subtítulo:</label>
                                <input
                                    value={formData.subtitle}
                                    onChange={(e) => handleChange("subtitle", e.target.value)}
                                    placeholder="Subtítulo"
                                    style={{ width: "100%" }}
                                />
                                </div>

                                <div style={{ flex: 1 }}>
                                <label>Descripción:</label>
                                <input
                                    value={formData.descripcion}
                                    onChange={(e) => handleChange("descripcion", e.target.value)}
                                    placeholder="Descripción"
                                    style={{ width: "100%" }}
                                />
                                </div>
                            </div>

                            <button type="submit">Guardar</button>
                        </form>
                    );
                }}
            />
            </LocalizationProvider>
    )
}

export default App;
