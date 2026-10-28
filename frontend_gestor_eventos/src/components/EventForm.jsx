import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import { X } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns"
import api from '../api/axios';
import "../CSS/ModalDeleted.css"

function EventForm({ show, onHide, ItemSelect, onsetItemSelect, eventsSee, onsetEventsSee, onsetKey, setMessageToast, setShowToast, IsLoadingModal, peticion, onKey }) {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm()
    const [dupliquedEvent, setDupliquedEvent] = useState(false)

    const onsumit = async (values) => {

        if (ItemSelect?.id) {
            const prevEvent = eventsSee.find((prev) => prev.id == ItemSelect.id)
            try {
                onsetEventsSee((prev) => prev.map((event) => event.id == ItemSelect.id ? values : event))
                onHide()
                reset({})
                onsetItemSelect({})
                setDupliquedEvent(false)
                const updatedEvent = await api.put(`/events/${ItemSelect.id}`, values)
                setMessageToast({ mensaje: updatedEvent?.data.message, code: updatedEvent.status })
                setShowToast(true)
            }
            catch (err) {
                onsetEventsSee((prev) => prev.map((event) => event.id == ItemSelect.id ? prevEvent : event))
                setMessageToast({ mensaje: err.response?.data.message, code: err.response?.status })
                setShowToast(true)
            }
        } else {
            try {
                const postEvent = await api.post("/events", values)
                onHide()
                reset({})
                onsetItemSelect({})
                setDupliquedEvent(false)
                setMessageToast({ mensaje: postEvent?.data.message, code: postEvent.status })
                setShowToast(true)

                if (onKey == "todos los eventos") {
                    peticion()
                } else {
                    onsetKey("todos los eventos")
                }

            } catch (err) {
                setMessageToast({ mensaje: err.response?.data.message, code: err.response?.status })
                setShowToast(true)
            }
        }

    }

    const closedModal = () => {
        onHide()
        reset({})
        onsetItemSelect({})
        setDupliquedEvent(false)
    }

    useEffect(() => {
        if (show) {
            reset(ItemSelect.id ? {
                ...ItemSelect, date: ItemSelect.date ? parse(format(ItemSelect.date, "yyyy-MM-dd"), "yyyy-MM-dd", new Date()) : null
            } : {})

        } else {
            reset({
                title: "",
                description: "",
                date: null,
                time: "",
                place: "",
                status: "Pendiente"
            })
        }
    }, [ItemSelect, reset, show])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            keyboard={false}
            backdrop="static"
            centered
        >
            <Modal.Header className='d-flex justify-content-between' >
                <Modal.Title id="contained-modal-title-vcenter">
                    {ItemSelect?.id ? "Editar Evento" : "Crear Evento"}
                </Modal.Title>
                <Button onClick={closedModal} className='cursor-pointer botonNo'> <X></X> </Button>

            </Modal.Header>
            {IsLoadingModal ?
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onsumit)}>
                        <InputGroup >
                            <InputGroup.Text className='w-25' id="basic-addon1">Título</InputGroup.Text>
                            <Form.Control
                                placeholder="...."
                                aria-label="Title"
                                aria-describedby="basic-addon1"
                                {...register("title", {
                                    required: "El titulo es obligatorio", setValueAs: (value) => value.trim()
                                })}
                            />
                        </InputGroup>
                        {errors.title && <span className='text-danger'>{errors.title.message}</span>}
                        <InputGroup className="mt-3 mb-3">
                            <InputGroup.Text className='w-25' id="basic-addon1">Descripción</InputGroup.Text>
                            <Form.Control
                                placeholder="...."
                                aria-label="Description"
                                aria-describedby="basic-addon1"
                                {...register("description")}
                            />
                        </InputGroup>
                        <div className='d-sm-flex justify-content-between mb-3 gap-3'>
                            <div className='d-flex'>
                                <InputGroup.Text className='w-50 w-sm-25' id="basic-addon1">Fecha</InputGroup.Text>
                                <Controller
                                    control={control}
                                    required={true}
                                    name="date"
                                    rules={{ required: "La fecha es obligatoria", validate: (value) => value > new Date() ? true : "La fecha debe ser mayor a la fecha actual" }}
                                    render={({ field }) => (
                                        <DatePicker className='btn border form-control z-3'
                                            dateFormat="yyyy-MM-dd"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            placeholderText="Seleccione una fecha"
                                        />
                                    )}
                                />
                            </div>
                            <div className='d-flex mt-3 mt-sm-0'>
                                <InputGroup.Text className=' mb-sm-0 w-50' id="basic-addon1">Hora</InputGroup.Text>
                                <input className='btn border cursor-pointer z-0' {...register("time", { required: "La hora es obligatorio" })} type="time" />
                            </div>
                        </div>
                        {errors.date && <span className='text-danger d-block'>{errors.date.message}</span>}
                        {errors.time && <span className='text-danger'>{errors.time.message}</span>}
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='w-25' id="basic-addon1">Lugar</InputGroup.Text>
                            <Form.Control
                                placeholder="...."
                                aria-label="Place"
                                aria-describedby="basic-addon1"
                                {...register("place")}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text className='w-25' id="basic-addon1">Estado</InputGroup.Text>
                            <Form.Select {...register("status")} aria-label="Seleccione una opción">
                                <option disabled>Seleccione una opción</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Completado">Completado</option>
                                <option disabled value="Vencido">Vencido</option>
                            </Form.Select>
                        </InputGroup>
                        {dupliquedEvent && <span className='text-danger'>Hay un evento con la misma fecha y titulo</span>}
                        <div className='d-flex justify-content-center'>
                            <Button type='submit' className='botonNo fw-bold' >
                                {ItemSelect?.id ? "Actualizar" : "Crear"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body> :
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" color='#10182b' role="status">
                    </div>
                </div>
            }
        </Modal>
    );
}

export default EventForm;