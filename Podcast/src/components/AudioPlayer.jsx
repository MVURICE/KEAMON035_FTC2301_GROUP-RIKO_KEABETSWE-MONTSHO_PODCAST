import React, { useState, useEffect } from "react";

export default function AudioPlayer(props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = document.getElementById("audio-element");
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);

    
    };
  }, [props.selectedTrack]);


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
    <div className="AudioPlayer">
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100}
        onChange={handleRangeChange}
      />
      <div>
        {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
      </div>
      <audio id="audio-element">
        <source src={props.selectedTrack} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
