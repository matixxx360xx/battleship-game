import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './Menu.css'
import waves from '/public/waves.mp4';
import rustle from '/public/rustle.mp3';

export default function Menu() {
  const navigate = useNavigate();

  const audioRef = useRef(new Audio(rustle));

  function handleHover() {
    audioRef.current.currentTime = 0;
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
        <button className="item">
          <span className="badge">
            <svg viewBox="0 0 24 24"><path d="M4 15 L20 15 L18 20 L6 20 Z"/><path d="M12 15 V5"/><path d="M12 6 L18 10 L12 12 Z"/><path d="M12 6 L7 9 L12 11 Z" fill="var(--gold-line)"/></svg>
          </span>
          <span className="label"  onClick={() => navigate("/game")} onMouseEnter={handleHover}>Graj</span>
        </button>

        <button className="item">
          <span className="badge">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2"/><path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21 M5.6 5.6 L7.8 7.8 M16.2 16.2 L18.4 18.4 M18.4 5.6 L16.2 7.8 M7.8 16.2 L5.6 18.4"/></svg>
            
          </span>
           <span className="label">Tryb wieloosobowy</span>
          
        </button>

        <button className="item" >
          <span className="badge">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M12 7 V19 M6 13 H18 M5 13 Q5 19 12 20 Q19 19 19 13"/></svg>
          </span>
          <span className="label" onClick={() => navigate("/options")} onMouseEnter={handleHover}>Opcje</span>
        </button>

        <button className="item">
          <span className="badge">
            <svg viewBox="0 0 24 24"><path d="M4 5 Q9 3 12 6 Q15 3 20 5 V18 Q15 16 12 19 Q9 16 4 18 Z"/><path d="M12 6 V19"/></svg>
          </span>
          <span className="label" onMouseEnter={handleHover}>Poradnik</span>
        </button>

        <button className="item">
          <span className="badge">
            <svg viewBox="0 0 24 24"><rect x="5" y="3" width="12" height="18" rx="1"/><circle cx="14" cy="12" r="1.2" fill="var(--gold-line)"/></svg>
          </span>
          <span className="label" onMouseEnter={handleHover}>Wyjdź</span>
        </button>
      </nav>
    </div>
  </div>
</div>
  );
}