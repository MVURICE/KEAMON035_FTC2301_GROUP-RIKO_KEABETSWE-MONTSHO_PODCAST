import React from "react"
// import DisplayTrack from "./DisplayTrack"
import Controls from "./Controls"
import ProgressBar from "./ProgressBar"
import { useRef } from "react"
import { BsMusicNoteBeamed } from 'react-icons/bs'





export default function AudioPlayer(props)  {

  const progressBarRef = useRef();


    return (
      <div className="audio-player">
        <div className="inner">
            <audio 
            src={props.currentTrack}
            ref={props.audioRef}
             controls />
              <div className="audio-info">
        
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
        <div className="text">
          <p className="title">{props.currentTrackTitle}</p>
          <p>Epiosode{props.currentTrackEpisode}</p>
        </div>
      </div>
            <Controls audioRef={props.audioRef}/>
            <ProgressBar 
            progressBarRef={progressBarRef} 
            audioRef={props.audioRef}
            timeProgress={props.timeProgress}
            duration={props.duration} />
        </div>
      </div>
    )
  }
