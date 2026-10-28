import { LogOut, X } from 'lucide-react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import "../CSS/ModalDeleted.css"


function ModalConfing() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  const ClosedSesion = () => {
    localStorage.removeItem("token")
    navigate("/")
    setShow(false)
  }
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <>
      <Button className="ms-3 btn rounded-4" style={{ background: "#1E293B" }} onClick={handleShow}> <LogOut />  </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='title-ClosedSesion d-flex justify-content-between '>
          <Modal.Title className='fw-bold text-white'>Cerrar Sesión</Modal.Title>
          <Button onClick={handleClose} className='botonConfigNo fw-bold'><X /> </Button>
        </Modal.Header>
        <Modal.Body className='fw-bold'>Esta seguro de querer cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button className="botonNo fw-bold" onClick={ClosedSesion}>
            Cerrar Sesión
          </Button>
          <Button className="botonSi fw-bold" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfing;