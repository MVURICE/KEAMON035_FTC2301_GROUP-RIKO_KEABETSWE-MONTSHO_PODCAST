import React from "react";



export default function Episodes(props){
    // return(
    //     <div className="episodes">
    //         <div className="season-hero-banner">
    //             <div className="episode-image-container">
    //                 <img src={props.image} />
    //             </div>
    //             <div className="season-description">
    //                 <h3>{props.title}</h3>
    //                 <p>{props.episodes} Episodes</p>
    //             </div>
    //         </div>
    //         <div className="show-episodes">
            
    //         </div>

    //     </div>
    // )

    return(
        <div className="seasons-card">
            <div className="season-image-container">
            <h3 className="seasons-metadata-header">{props.title}</h3>
            </div>
            <div className="seasons-metadata">
                
                <p className="seasons-metadata-episodes">{props.description} Episodes</p>
                <button>play</button>
                <button>Favourite</button>
            </div>
        </div>

    )
}