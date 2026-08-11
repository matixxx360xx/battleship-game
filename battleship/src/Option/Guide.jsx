import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './Menu.css'

import waves from '/public/waves.mp4';
import rustle from '/public/rustle.mp3';

export default function Guide({ sfxVolume }) {
    const navigate = useNavigate();

    const audioRef = useRef(new Audio(rustle));

    function handleHover() {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = sfxVolume;
        audioRef.current.play();
    }
    return (

        <div className="scene">
            <video autoPlay autoPlay loop playsInline muted width="100%" src={waves} />
            <div className="stage">
                <div className="parchment">
                    <h1>BITWA MORSKA</h1>
                    <div className="rule"></div>
                    <nav>
                        <div className='Guide'>
                            <h2>Cel gry:</h2>
                            <span>Twoim zadaniem jest zatopienie całej floty przeciwnika, zanim komputer zatopi Twoje statki.</span>

                            <h2>Twoja flota</h2>
                            <span>Na początku gry Twoje statki są automatycznie rozmieszczane na planszy.<br/><br/>Flota składa się z:</span>
                            <ul>
                                <li>Lotniskowiec — 5 pól</li>
                                <li>Pancernik — 4 pola</li>
                                <li>Krążownik — 3 pola</li>
                                <li>Niszczyciel — 3 pola</li>
                                <li>Okręt podwodny — 2 pola</li>
                            </ul>
                            <span>Statki są rozmieszczane losowo i nie mogą znajdować się obok siebie.</span>

                            <h2>Oddawanie strzałów</h2>
                            <span>Kliknij wybrane pole na planszy przeciwnika, aby oddać strzał.</span>

                            <h2>Trafienie</h2>
                            <span>Jeżeli na wybranym polu znajduje się statek, pole zmieni kolor na <strong style={{color:"red"}}>czerwony.</strong></span>

                            <h2>Pudło</h2>
                            <span>Jeżeli na polu nie ma statku, zobaczysz <strong style={{color:"rgb(85, 85, 236)"}}>niebieskie</strong> pole.</span>

                            <h2>Zwycięstwo</h2>
                            <span>Musisz zdobyć 17 trafień, aby zatopić całą flotę przeciwnika.</span>
                        </div>
                        <button className="item">
                            <span className="badge">
                                <svg viewBox="0 0 24 24"><rect x="5" y="3" width="12" height="18" rx="1" /><circle cx="14" cy="12" r="1.2" fill="var(--gold-line)" /></svg>
                            </span>
                            <span className="label"  onClick={() => navigate("/")} onMouseEnter={handleHover}>Wyjdź</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}