
import React, { useState, useEffect, useRef } from "react";
import Play from '../assets/play.png';
import Pause from '../assets/pause.png';

function useAudioPlayer(props) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault();
        event.returnValue = "Are you sure you want to exit the page while music is playing";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [props.selectedTrack, isPlaying]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const handleRangeChange = (event) => {
    const audioElement = audioRef.current;
    const seekTime = (event.target.value / 100) * duration;
    audioElement.currentTime = seekTime;
  };

  return { audioRef, currentTime, duration, isPlaying, handlePlayPause, handleRangeChange };
}

export default function AudioPlayer(props) {
  const { audioRef, currentTime, duration, isPlaying, handlePlayPause, handleRangeChange } = useAudioPlayer(props);

  const formatTimestamp = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderControls = () => (
    <>
      <input
        className="range"
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100}
        onChange={handleRangeChange}
      />
      {formatTimestamp(currentTime)} / {formatTimestamp(duration)}
    </>
  );

  return (
    <div className="audioplayer">
      <div className="audio-metadata">
        <img className="audio-play-pause-image" onClick={handlePlayPause} src={isPlaying ? Pause : Play} alt="Play-Pause button" />
        <div className="audio-meta-details">
          <h3>{props.title}</h3>
          <br />
          <h5>Episode {props.episode}</h5>
        </div>
      </div>

      <div className="audio-controls">
        {duration > 0 && renderControls()}
      </div>

      <audio ref={audioRef}>
        <source src={props.selectedTrack} />
      </audio>
    </div>
  );
}
