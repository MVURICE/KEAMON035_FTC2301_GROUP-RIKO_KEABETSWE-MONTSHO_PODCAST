import React from "react"
// import DisplayTrack from "./DisplayTrack"
import Controls from "./Controls"
import ProgressBar from "./ProgressBar"



export default function AudioPlayer(props)  {
    return (
      <div className="audio-player">
        <div className="inner">
            <audio 
            src={props.currentTrack}
            ref={props.audioRef}
             controls />
            <Controls audioRef={props.audioRef}/>
            <ProgressBar />
        </div>
      </div>
    )
  }
