import React from "react";


export default function ProgressBar({progressBarRef,audioRef,timeProgress,duration,}){

    function handleProgressChange () {
        audioRef.current.currentTime = progressBarRef.current.value;
        // console.log(progressBarRef.current.value);
      }

      return (
        <div className="progress">
          <span className="time current">{timeProgress}</span>
          <input
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleProgressChange}
          />
          <span className="time">{duration}</span>
        </div>
      )
}