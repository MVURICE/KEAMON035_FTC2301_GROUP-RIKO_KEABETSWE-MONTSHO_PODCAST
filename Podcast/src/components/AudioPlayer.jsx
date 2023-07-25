import React from "react"
import DisplayTrack from "./DisplayTrack"
import Controls from "./Controls"
import ProgressBar from "./ProgressBar"



export default function AudioPlayer()  {
    return (
      <div className="audio-player">
        <div className="inner">
            <DisplayTrack />
            <Controls/>
            <ProgressBar />
        </div>
      </div>
    )
  }
