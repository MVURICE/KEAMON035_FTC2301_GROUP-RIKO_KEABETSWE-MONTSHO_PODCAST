import React, { useState, useEffect } from "react";
import Play from '../assets/play.png'
import pause from '../assets/pause.png' 

export default function AudioPlayer(props) {
  // State variables to manage the audio player
  const [currentTime, setCurrentTime] = useState(0); // Current playback time of the audio
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const [isPlaying, setIsPlaying] = useState(false); // Flag to indicate if the audio is currently playing or paused

  // useEffect to handle side effects when component mounts, updates, or unmounts
  useEffect(() => {
    // Get the audio element from the DOM
    const audioElement = document.getElementById("audio-element");

    // Event listeners to update state when audio metadata and time change
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    // Event listener to prompt confirmation before leaving the page if audio is playing
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = "Are you sure you want to exit the page while music is playing";
        // Modern browsers require a return value to show the confirmation dialog
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up event listeners when the component is unmounted
    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [props.selectedTrack, isPlaying]);

  // Function to handle loaded metadata event (duration available)
  function handleLoadedMetadata() {
    const audioElement = document.getElementById("audio-element");
    setDuration(audioElement.duration);
  }

  // Function to handle time update event (current playback time changes)
  function handleTimeUpdate() {
    const audioElement = document.getElementById("audio-element");
    setCurrentTime(audioElement.currentTime);
  }

  // Function to format timestamp from seconds to "mm:ss" format
  function formatTimestamp(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  // Function to handle Play/Pause button click
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

  // Function to handle Seek slider change (change audio playback time)
  function handleRangeChange(event) {
    const audioElement = document.getElementById("audio-element");
    const seekTime = (event.target.value / 100) * duration;
    audioElement.currentTime = seekTime;
  }

  // JSX of the AudioPlayer component
  return (
    <div className="audioplayer">
      <div className="audio-metadata">
         <img className="audio-play-pause-image" onClick={handlePlayPause} src={isPlaying ? pause : Play} alt="Play-Pasue button" />
        {/* <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button> */}
        <div className="audio-meta-details">
          <h3>{props.title}</h3>
          <br /> 
          <h5>Episode {props.episode}</h5>
        </div>
      </div>

      <div className="audio-controls">
        {duration > 0 && (
          <input
            className="range"
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100}
            onChange={handleRangeChange}
          />
        )}
        {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
        <div>{/* Additional controls or information can be added here */}</div>
      </div>

      {/* The audio element with the selected audio track */}
      <audio id="audio-element">
        <source src={props.selectedTrack} />
      </audio>
    </div>
  );
}
