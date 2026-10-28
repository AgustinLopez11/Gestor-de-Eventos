import { useEffect, useRef } from "react";
import "../CSS/Header.css"
import sonic2 from "../assets/sonic2.png"

const Header = () => {

    useEffect(() => {

    let ultimoScroll = window.scrollY;

    const moverSonic = () => {

        const scroll = window.scrollY;

        const alturaTotal =
            document.documentElement.scrollHeight - window.innerHeight;

        const porcentaje = scroll / alturaTotal;

        const header = document.querySelector(".header");
        const sonic = document.querySelector(".sonic");

        if (!header || !sonic) return;

        const recorrido =
            header.clientWidth - sonic.clientWidth;

        if (scroll >= ultimoScroll) {

            sonic.style.transform =
                `translateX(${porcentaje * recorrido}px) scaleX(1)`;

        } else {

            sonic.style.transform =
                `translateX(${porcentaje * recorrido}px) scaleX(-1)`;

        }

        ultimoScroll = scroll;
    };

    window.addEventListener("scroll", moverSonic);

    return () => window.removeEventListener("scroll", moverSonic);

}, []);

    return (
        <>

            <div className="d-flex flex-column header mb-4">
                <img className="sonic" src={sonic2} alt="Sonic" />
                <h1 className="titulo text-center">Mi Gestor Personal De Eventos</h1>
            </div>
        </>

    );
}

export default Header;