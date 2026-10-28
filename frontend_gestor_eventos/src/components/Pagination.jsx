import { Button } from "react-bootstrap";

import "../CSS/Pagination.css"
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ page, totalPaginas, onPageChange }) => {


    const returnPages = () => {

        if (totalPaginas <= 5) {
            return Array.from({ length: totalPaginas }, (_, indice) => indice + 1)
        }

        if (page <= 2) {
            return [1, 2, "...", totalPaginas - 1, totalPaginas]
        }

        if (page >= totalPaginas - 2) {
            return [1, "...", totalPaginas - 2, totalPaginas - 1, totalPaginas]
        }

        return [1, "...", page, "...", totalPaginas]
    }

    const pages = returnPages()

    return (
        <>
            <div className="d-flex justify-content-center mt-3 mb-3 gap-1">
                <Button className="botonControl" onClick={() => onPageChange(page - 1)} disabled={page == 1} ><ArrowLeft /> </Button>
                {pages?.map((pag, index) => {
                    return pag == "..." ? <Button key={index} className="botonNumero" >{pag} </Button> : <Button className="botonNumero" key={index} disabled={pag == page} onClick={() => onPageChange(pag)} active={pag == page} >{pag} </Button>
                })}
                <Button className="botonControl" onClick={() => onPageChange(page + 1)} disabled={page == totalPaginas || totalPaginas == 0} ><ArrowRight /> </Button>

            </div>
        </>
    );
}

export default Pagination;