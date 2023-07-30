import React from "react";


/**
 * SeasonCard component represents a card displaying information about a season of a TV show.
 *
 * @component
 * @param {Object} props - The props passed to the SeasonCard component.
 * @param {string} props.image - The URL of the image representing the season.
 * @param {string} props.title - The title of the season.
 * @param {number} props.episodes - The number of episodes in the season.
 * @param {Function} props.handleClick - The function to be called when the "play" button is clicked.
 * @returns {JSX.Element} The JSX representation of the SeasonCard component.
 */
const SeasonCard = (props) => {
    return (
      <div className="seasons-card">
        <div className="season-image-container">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="seasons-metadata-container">
          <h3 className="seasons-metadata-header">{props.title}</h3>
          <p className="seasons-metadata">{props.episodes} Episodes</p>
          <button onClick={props.handleClick}>play</button>
          <button>Favourite</button>
        </div>
      </div>
    );
  };
  
  export default SeasonCard;
  