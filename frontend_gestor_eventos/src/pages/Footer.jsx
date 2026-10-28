import { CalendarCheck2, Mail } from "lucide-react";
import "../CSS/Footer.css"

const Footer = () => {
    return (
        <>
            <div className="footer text-white d-flex justify-content-center justify-content-md-between py-4 px-4">
                <span className="d-none d-md-inline-flex align-items-center fw-bold" ><Mail />  agus77chang@gmail.com</span>
                <span className="fw-bold">© 2026 Licence Asociation</span>
                <span className="d-none d-md-inline-flex align-items-center fw-bold"><CalendarCheck2 /> Gestor Eventos</span>
            </div>
        </>
    );
}

export default Footer;