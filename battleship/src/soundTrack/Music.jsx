import { useEffect, useRef } from "react";

export default function Music({ loopMusic, musicVolume }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        `${import.meta.env.BASE_URL}Song1.mp3`
      );
    }

    const audio = audioRef.current;

    audio.loop = loopMusic;
    audio.volume = musicVolume;
    if (loopMusic) {
      audio.play();

    } else {
      audio.pause();
      audio.currentTime = 0;
    }

  }, [loopMusic, musicVolume]);

  return null;
}