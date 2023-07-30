import React from "react";



export default function Episodes(props){

    const toggleFavouriteButton = props.isFavourite

    return(
        <div className="episodes-card">
            <div className="episode-name-container">
                <h3 className="episodes-metadata-header">{props.title}</h3>
            <div className="episode-buttons">
                <button onClick={props.play} >play</button>
                <button onClick={props.favourite}>{toggleFavouriteButton ? "Remove from Favourites" : "Favourite"}</button>
            </div>
            </div>
            <div className="episodes-metadata-container">
                <p className="episodes-metadata">{props.description}</p>
            </div>
        </div>
    )
}