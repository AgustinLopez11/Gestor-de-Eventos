import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { X } from "lucide-react"
import { useEffect } from 'react';
import api from '../api/axios';
import "../CSS/ModalDeleted.css"

function ModalDeleted({ show, onHide, onsetEventsSee, eventsSee, ItemSelect, onsetItemSelect, setMessageToast, setShowToast,ReviserPages }) {

    const { reset, } = useForm()

    const deletedEventConfirm = async () => {
        const listEventPrevius = eventsSee
        try {
            onsetEventsSee((prev) => prev.filter((event) => event.id != ItemSelect.id))
            onHide()
            const deletedEvent = await api.delete(`/events/${ItemSelect.id}`)
            setMessageToast({ mensaje: deletedEvent.data.message, code: deletedEvent.status })
            setShowToast(true)
            onsetItemSelect({})
            ReviserPages()

        }
        catch (err) {
            console.log(err)
            onsetEventsSee(listEventPrevius)
            setMessageToast({ mensaje: err.response?.data?.message, code: err.response?.status })
            setShowToast(true)
        }
    }

    const closedDeletedModal = () => {
        onHide()
        onsetItemSelect({})
    }

    useEffect(() => {
        if (show) {
            reset(ItemSelect.id ? {
                ...ItemSelect,
            } : {})
        } else {
            reset({
                title: "",
                description: "",
                date: null,
                time: "",
                place: "",
                state: "Pendiente"
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
                    Seguro de Eliminar el Evento?
                </Modal.Title>
                <Button onClick={closedDeletedModal} className='cursor-pointer botonNo'> <X></X> </Button>
            </Modal.Header>
            <Modal.Body className='d-flex justify-content-center gap-5'>
                <Button onClick={deletedEventConfirm} className='botonSi'>Si</Button>
                <Button onClick={closedDeletedModal} className='botonNo' >No</Button>

            </Modal.Body>
        </Modal>
    );
}

export default ModalDeleted;