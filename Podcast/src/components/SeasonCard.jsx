import React from "react";


export default function SeasonCard(props){

   

    return(
        <div className="seasons-card">
            <div className="season-image-container">
                <img src={props.image} />
            </div>
            <div className="seasons-metadata-container">
                <h3 className="seasons-metadata-header">{props.title}</h3>
                <p className="seasons-metadata">{props.episodes} Episodes</p>
                <button onClick={props.handleClick}>play</button>
                <button>Favourite</button>
            </div>
        </div>

    )

}