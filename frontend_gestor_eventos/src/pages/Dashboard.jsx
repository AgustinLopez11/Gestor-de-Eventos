import { Button, Tab, Tabs } from 'react-bootstrap'
import EventItem from '../components/EventItem'
import EventForm from '../components/EventForm'
import { useEffect, useState } from 'react'
import ModalDeleted from '../components/ModalDeleted'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ModalConfing from '../components/ModalConfing'
import api from '../api/axios'
import ToastComponent from '../components/Toast'
import { X } from 'lucide-react'
import Pagination from '../components/Pagination'
import Footer from './Footer'

const buttonsPags = [
  { eventKey: "todos los eventos", title: "Todos" },
  { eventKey: "eventos proximos", title: "Próximos 3 días" },
  { eventKey: "eventos completados", title: "Completados" },
  { eventKey: "eventos pendientes", title: "Pendientes" },
  { eventKey: "eventos vencidos", title: "Vencidos" }]

function Dashboard() {

  const [eventsSee, setEventsSee] = useState([])
  const [inputdate, setInputdate] = useState(null)

  const [modalShow, setModalShow] = useState(false)
  const [ItemSelect, setItemSelect] = useState({})
  const [modalShowDeleted, setModalShowDeleted] = useState(false)

  const [key, setKey] = useState('todos los eventos')

  const [ShowToast, setShowToast] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsLoadingModal, setIsLoadingModal] = useState(true);
  const [MessageToast, setMessageToast] = useState({ mensaje: "", code: null })

  //Paginacion
  const [IsPagination, setIsPagination] = useState({})

  //Petición General
  const Peticion = async (pageNext) => {
    setIsLoading(true)

    try {
      const eventsApi = await api.get("/events", { params: { date: inputdate?.toISOString().split("T")[0], filtOptions: key, page: pageNext, limit: 8 } })
      setIsPagination({ page: eventsApi.data.results.pagination.page, totalPaginas: eventsApi.data.results.pagination.totalPaginas })
      setEventsSee(eventsApi.data.results.eventos)
    }
    catch (err) {
      setMessageToast({ mensaje: err.response?.data?.message, code: err.response?.status })
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  //Revisador de Paginación
  const ReviserPages = async () => {
    try {
      const eventsApi = await api.get("/events", { params: { date: inputdate?.toISOString().split("T")[0], filtOptions: key, limit: 8 } })
      if (eventsApi.data.results.pagination.totalPaginas != IsPagination.totalPaginas && IsPagination.page > 1) {
        Peticion(IsPagination.page - 1)
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    Peticion()
  }, [inputdate, key])

  return (
    <>
      <div className='d-flex flex-column main min-vh-100'>  
        <main className='flex-grow-1'>
          <>
            <ToastComponent ShowToast={ShowToast} toggleShowToastA={() => setShowToast(false)} MessageToast={MessageToast} />
            <EventForm
              show={modalShow}
              onHide={() => setModalShow(false)}
              ItemSelect={ItemSelect}
              onsetItemSelect={setItemSelect}
              onsetEventsSee={setEventsSee}
              eventsSee={eventsSee}
              onsetKey={setKey}
              setMessageToast={setMessageToast}
              setShowToast={setShowToast}
              IsLoadingModal={IsLoadingModal}
              peticion={Peticion}
              onKey={key}
            />

            <ModalDeleted
              show={modalShowDeleted}
              onHide={() => setModalShowDeleted(false)}
              eventsSee={eventsSee}
              onsetEventsSee={setEventsSee}
              ItemSelect={ItemSelect}
              onsetItemSelect={setItemSelect}
              setMessageToast={setMessageToast}
              setShowToast={setShowToast}
              ReviserPages={ReviserPages}
            />

            <div className='mt-3 d-flex justify-content-center gap-2 pt-3 pb-3 container flex-wrap tabs'>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                onClick={() => setInputdate(null)}
                className="mb-3 border-3 justify-content-center"
              >
                {buttonsPags.map((event, index) =>
                  <Tab key={index} eventKey={event.eventKey} title={event.title} />
                )}
              </Tabs>
              <Button onClick={() => setModalShow(true)} className='btn btn-light border border-3 w-auto text-white rounded-5 fw-bold' style={{ background: "#1E293B" }}>Crear Evento</Button>
              <ModalConfing />
            </div>
            <div className={`${key == "eventos proximos" && " d-none"} mt-3 d-flex justify-content-center gap-2 flex-wrap mb-3 search mb-5`} >
              <DatePicker className='btn border z-3 border-black bg-white '
                dateFormat="yyyy-MM-dd"
                selected={inputdate}
                onChange={(date) => setInputdate(date)}
                placeholderText="Seleccione una fecha 🔎"
              />
              {inputdate && <Button onClick={() => setInputdate(null)} className='btn botonSi'><X /> </Button>}
            </div>
            {IsLoading ?
              <div className='text-center'>
                <Button className="btn  botonNo fw-bold">
                  <span className='btn cargando'></span>
                  Cargando...
                </Button>
              </div> :
              <>
                <div className='d-flex justify-content-center container gap-3 flex-wrap'>
                  {eventsSee.map((event) => {
                    return <EventItem onsetModalShowDeleted={setModalShowDeleted} onsetItemSelect={setItemSelect} key={event.id} event={event} setModalShow={setModalShow} onsetEventsSee={setEventsSee} oneventsSee={eventsSee} setMessageToast={setMessageToast}
                      setIsLoadingModal={setIsLoadingModal} setShowToast={setShowToast} keyPag={key}  ></EventItem>
                  })}

                  {eventsSee.length == 0 && <span className='mt-5 fw-bold'>No hay Eventos que mostrar 😕</span>}
                </div>
                {IsPagination.totalPaginas == 1 ? "" : IsPagination.totalPaginas == 0 ? "" : <Pagination page={IsPagination.page} totalPaginas={IsPagination.totalPaginas} onPageChange={Peticion} />}
              </>
            }
          </>
        </main >
        <Footer />
      </div >
    </>
  )
}

export default Dashboard
