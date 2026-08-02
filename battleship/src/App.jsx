import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./Option/Menu.jsx";
import Options from "./Option/Options.jsx";
import Game from "./Game/Game.jsx";
import Music from "./soundTrack/Music.jsx";
function App() {
  const [loopMusic, setLoopMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(1);

  return (
   <>
      <Music loopMusic={loopMusic} musicVolume={musicVolume}/>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route 
          path="/game" 
          element={<Game />}
        />
        <Route 
          path="/options" 
          element={<Options setLoopMusic={setLoopMusic} setMusicVolume={setMusicVolume} loopMusic={loopMusic} musicVolume={musicVolume} />}
        />
      </Routes>
    </>
  );
}

export default App;