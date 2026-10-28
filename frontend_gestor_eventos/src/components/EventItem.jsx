import { Card, Button, Badge } from "react-bootstrap"
import api from "../api/axios"
import { format } from "date-fns"
import "../CSS/EventItem.css"
import { AlarmClock, CalendarFold, Earth, InspectionPanel, MapPin, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"


const EventItem = ({ event, setModalShow, onsetItemSelect, onsetModalShowDeleted, onsetEventsSee, oneventsSee, setMessageToast, setShowToast, keyPag, setIsLoadingModal }) => {

    const [IsLoading, setIsLoading] = useState(false)

    const editModal = async (id) => {
        setIsLoading(true)
        setIsLoadingModal(false)
        try {
            setModalShow((previus) => !previus)
            const getEvent = await api.get(`/events/${id}`)
            onsetItemSelect(getEvent.data.evento)
        }
        catch (err) {
            setMessageToast({ mensaje: err.response?.data.message, code: err.response.data.status })
            setShowToast(true)
        }
        finally {
            setIsLoading(false)
            setIsLoadingModal(true)
        }
    }

    const deletedEvent = async (id) => {
        setIsLoading(true)
        try {
            const localEvent = oneventsSee.find((event) => event.id == id)
            onsetItemSelect(localEvent)
            onsetModalShowDeleted(true)
        }
        catch {
            setMessageToast({ mensaje: err.response?.data.message, code: err.response.data.status })
            setShowToast(true)
        }
        finally {
            setIsLoading(false)
        }
    }

    const completedEvent = async (id, Onstatus) => {
        const prevEvent = oneventsSee.find((event) => event.id == id)
        setIsLoading(true)
        try {

            onsetEventsSee((prev) => prev.map(event => event.id == id ? { ...event, status: event.status == "Completado" ? "Pendiente" : "Completado" } : event))
            const getEvent = await api.patch(`/events/${id}`, { status: Onstatus == "Completado" ? "Pendiente" : "Completado" })
            setMessageToast({ mensaje: getEvent.data.message, code: getEvent.status })
            setShowToast(true)
        }
        catch (err) {
            setMessageToast({ mensaje: err.response?.data.message, code: err.response?.status })
            setShowToast(true)
            onsetEventsSee((prev) => prev.map(event => event.id == id ? { ...event, status: prevEvent.status } : event))
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <Card className={`text-center rounded-cicle shadow-sm border border-light-subtle tarjeta mb-3 cartas `} style={{ width: '18rem', background: "#FFFFFF", }}>
                <div className="d-flex justify-content-end" >
                    <div className=" w-auto p-1 rounded-4 border border-1">
                        {event.status != "Vencido" &&
                            <Button className="botones" disabled={IsLoading ? true : event.status == "Vencido" ? true : false} onClick={() => editModal(event.id)} variant="white"><Pencil color="#545b64" />  </Button>

                        }
                        <Button className="botones" disabled={IsLoading} onClick={() => deletedEvent(event.id)} variant="white" ><Trash2 color="#545b64" /> </Button>

                        {event.status == "Vencidos" || keyPag == "eventos completados" || keyPag == "eventos pendientes" || new Date(event.date) < new Date() ? "" :
                            <Button className="botones" disabled={IsLoading ? true : event.status == "Vencido" ? true : ""} onClick={() => completedEvent(event.id, event.status)} variant="white" > {event.status == "Completado" ? "✅" : "⬜"} </Button>
                        }
                    </div>
                </div>
                <Card.Body>
                    <Card.Title className="mb-3 fw-bold"> <InspectionPanel color="#adb2b9" /> {event.title}</Card.Title>
                    <Card.Text>
                        <MapPin color="#adb2b9" /> {event.description}
                    </Card.Text>
                    <Card.Text>
                        <CalendarFold color="#adb2b9" /> {format(event.date, "yyyy-MM-dd")} -- <AlarmClock color="#adb2b9" /> {event.time}
                    </Card.Text>
                    <Card.Text>
                        <Earth color="#adb2b9" /> {event.place}
                    </Card.Text>
                    <Card.Text className={`rounded-5 ${event.status == "Completado" ? "bgcompletado " : event.status == "Pendiente" ? "bgpendiente" : "bgvencido"} text-white fw-bold `}>
                        {event.status}
                    </Card.Text>
                    <div className="d-flex flex-column gap-2">

                    </div>
                </Card.Body>
            </Card >
        </>
    );
}

export default EventItem;