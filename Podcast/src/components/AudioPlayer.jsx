import React, { useState, useEffect } from "react";

export default function AudioPlayer(props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById("audio-element");
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = "Are you sure you want to exit page while music is playing"; // Modern browsers require a return value to show the confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [props.selectedTrack, isPlaying]);


  function handleLoadedMetadata() {
    const audioElement = document.getElementById("audio-element");
    setDuration(audioElement.duration);
  }

  function handleTimeUpdate() {
    const audioElement = document.getElementById("audio-element");
    setCurrentTime(audioElement.currentTime);
  }

  function formatTimestamp(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function handlePlayPause() {
    const audioElement = document.getElementById("audio-element");
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  }

  function handleRangeChange(event) {
    const audioElement = document.getElementById("audio-element");
    const seekTime = (event.target.value / 100) * duration;
    audioElement.currentTime = seekTime;
  }



  return (
    <div className="audioplayer">

        <div className="audio-metadata">
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
            <div>
                <h4>{props.title}</h4>
                <h5>Episode {props.episode}</h5>
            </div>
            <button>favourite</button>

        </div>


        <div className="audio-controls">
            
            {duration > 0 && <input className="range"
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100}
                onChange={handleRangeChange}
            />}{formatTimestamp(currentTime)} / {formatTimestamp(duration)}
            <div>
                
            </div>
        
            <audio id="audio-element">
                <source src={props.selectedTrack} />
            </audio>
      </div>
    </div>
  );
}
