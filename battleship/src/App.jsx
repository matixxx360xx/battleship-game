import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./Option/Menu.jsx";
import Options from "./Option/Options.jsx";
import Game from "./Game/Game.jsx";
import Guide from "./Option/Guide.jsx";
import Music from "./soundTrack/Music.jsx";
function App() {
  const [loopMusic, setLoopMusic] = useState(true);
  const [musicVolume, setMusicVolume] = useState(1);
  const [sfxVolume, setSfxVolume] = useState(1)

  return (
   <>
      <Music loopMusic={loopMusic} musicVolume={musicVolume}/>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route 
          path="/game" 
          element={<Game sfxVolume={sfxVolume} />}
        />
        <Route 
          path="/options" 
          element={<Options setLoopMusic={setLoopMusic} setMusicVolume={setMusicVolume} setSfxVolume={setSfxVolume} loopMusic={loopMusic} musicVolume={musicVolume} sfxVolume={sfxVolume} />}
        />
        <Route path="/guide"
        element={<Guide sfxVolume={sfxVolume}/>}
        />
      </Routes>
    </>
  );
}

export default App;