import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import "../CSS/Toast.css"

function ToastComponent({ ShowToast, toggleShowToastA, MessageToast }) {

    return (
        <div className='position-absolute mx-3'>
            <Row>
                <Col md={6} className="mb-2 w-auto" style={{
                    zIndex: 9999, position: "fixed"
                }}>
                    <Toast show={ShowToast} delay={3000} autohide onClose={toggleShowToastA}>
                        <Toast.Header className={MessageToast.code == 200 ? "title-toast" : "title-toast-err"}>
                            <strong className="me-auto">{MessageToast.code == 200 ? "Operación Exitosa" : "A ocurrido un error"} </strong>
                        </Toast.Header>
                        <Toast.Body className='fw-bold bg-white'>{MessageToast.mensaje || "Error Inesperado, Intente mas tarde"}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    );
}

export default ToastComponent;