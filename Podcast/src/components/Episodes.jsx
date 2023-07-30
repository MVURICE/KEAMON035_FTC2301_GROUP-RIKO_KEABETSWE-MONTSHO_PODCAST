/**
 * Episodes component represents a card displaying information about an episode.
 *
 * @component
 * @param {Object} props - The props passed to the Episodes component.
 * @param {string} props.title - The title of the episode.
 * @param {string} props.description - The description of the episode.
 * @param {boolean} props.isFavourite - A flag indicating if the episode is marked as a favorite.
 * @param {Function} props.play - The function to be called when the "play" button is clicked.
 * @param {Function} props.favourite - The function to be called when the "favorite" button is clicked.
 * @returns {JSX.Element} The JSX representation of the Episodes component.
 */
const Episodes = (props) => {
    const toggleFavouriteButton = props.isFavourite;
  
    
    return (
      <div className="episodes-card">
        <div className="episode-name-container">
          <h3 className="episodes-metadata-header">{props.title}</h3>
          <div className="episode-buttons">
            <button onClick={props.play}>play</button>
            <button onClick={props.favourite}>
              {toggleFavouriteButton ? "Remove from Favourites" : "Favourite"}
            </button>
          </div>
        </div>
        <div className="episodes-metadata-container">
          <p className="episodes-metadata">{props.description}</p>
        </div>
      </div>
    );
  };
  
  export default Episodes;
  