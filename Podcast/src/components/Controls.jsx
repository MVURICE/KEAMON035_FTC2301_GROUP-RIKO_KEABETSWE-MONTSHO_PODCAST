import React from "react";
import { useState,useEffect } from "react";


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

    function togglePlayPause() {
        setIsPlaying((prev) => !prev);
      }
      useEffect(() => {
        if (isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }, [isPlaying, audioRef]);

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