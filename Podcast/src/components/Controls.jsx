import {React,useCallback} from "react";
import { useState,useEffect,useRef } from "react";


import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
  } from 'react-icons/io5'


export default function Controls({ audioRef }){
    const [isPlaying, setIsPlaying] = useState(false);

    const playAnimationRef = useRef();
    function togglePlayPause  ()  {
      setIsPlaying((prevState) => !prevState);
    }

    const repeat = useCallback(() => {
      console.log('run');
    
      playAnimationRef.current = requestAnimationFrame(repeat);
    }, []);

    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
        playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
        audioRef.current.pause();
        cancelAnimationFrame(playAnimationRef.current);
      }
    }, [isPlaying, audioRef, repeat])

    return (
        <div className="controls-wrapper">
          <div className="controls">
            <button>
              <IoPlaySkipBackSharp />
            </button>
            <button>
              <IoPlayBackSharp />
            </button>
    
            <button onClick={togglePlayPause}>
              {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
            </button>
            <button>
              <IoPlayForwardSharp />
            </button>
            <button>
              <IoPlaySkipForwardSharp />
            </button>
          </div>
        </div>
      )
}