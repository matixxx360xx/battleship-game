import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './Menu.css'

import waves from '/public/waves.mp4';
import rustle from '/public/rustle.mp3';

export default function Options({ setLoopMusic, setMusicVolume, setSfxVolume, loopMusic, musicVolume, sfxVolume }) {
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
                        <button className="item" onClick={() => { setLoopMusic(prev => !prev) }} >
                            <span className="badge">
                                <svg viewBox="0 0 24 24"><path d="M4 5 Q9 3 12 6 Q15 3 20 5 V18 Q15 16 12 19 Q9 16 4 18 Z" /><path d="M12 6 V19" /></svg>
                            </span>
                            <span className="label" onMouseEnter={handleHover}>Muzyka w tle: {loopMusic ? "Włączona" : "Wyłączona"}</span>
                        </button>
                        <div className="item">
                            <span className="badge">
                                <svg viewBox="0 0 24 24"><path d="M12 3 L12 21 M3 6 L21 6 M3 12 L21 12 M3 18 L21 18" /></svg>
                            </span>
                            <span className="label" onMouseEnter={handleHover}>Głośność muzyki:</span>
                            <div className="bottle-slider">
                                <div className="bottle-fill" style={{ height: `${musicVolume * 100}%` }}></div>
                                <div className="bottle-volume">{Math.round(musicVolume * 100)}%</div>
                                <input type="range" min="0" max="1" step="0.01" value={musicVolume} onChange={(e) => setMusicVolume(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="item">
                            <span className="badge">
                                <svg viewBox="0 0 24 24"><path d="M12 3 L12 21 M3 6 L21 6 M3 12 L21 12 M3 18 L21 18" /></svg>
                            </span>
                            <span className='label' onMouseEnter={handleHover}>Głośność efektów:</span>
                            <div className="bottle-slider2">
                                <div className="bottle-fill2" style={{ height: `${sfxVolume * 100}%` }}></div>
                                <div className="bottle-volume">{Math.round(sfxVolume * 100)}%</div>
                                <input type="range" min="0" max="1" step="0.01" value={sfxVolume} onChange={(e) => setSfxVolume(Number(e.target.value))} />
                            </div>
                        </div>
                        <button className="item">
                            <span className="badge">
                                <svg viewBox="0 0 24 24"><rect x="5" y="3" width="12" height="18" rx="1" /><circle cx="14" cy="12" r="1.2" fill="var(--gold-line)" /></svg>
                            </span>
                            <span className="label" onClick={() => navigate("/")} onMouseEnter={handleHover}>
                                Wyjdź
                            </span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}