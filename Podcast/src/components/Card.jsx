/**
 * Card component represents a card containing information about a Podcast.
 *
 * @component
 * @param {Object} props - The props passed to the Card component.
 * @param {string} props.title - The title of the TV show or movie.
 * @param {string} props.image - The URL of the image representing the TV show or movie.
 * @param {number} props.season - The number of seasons of the TV show (can be a float).
 * @param {string} props.genre - The genre(s) of the TV show or movie.
 * @param {string} props.lastUpdated - The date when the information was last updated.
 * @param {Function} props.handleShow - The function to be called when the card is clicked.
 * @param {number} [props.selectedGenre] - The selected genre number to filter cards (optional).
 * @returns {JSX.Element} The JSX representation of the Card component.
 * 
 * @example
 * // Example usage of Card component
 * <Card
 *   title="Podcast Title"
 *   image="https://example.com/podcast-image.jpg"
 *   season={5}
 *   genre="Business"
 *   lastUpdated="2023-11-30"
 *   handleShow={handleCardClick}
 * />
 */
// eslint-disable-next-line no-unused-vars
import React from 'react';

/**
 * Object containing genre labels based on genre numbers.
 * @type {Object.<string, string>}
 */
const genres = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

/**
 * Functional component representing a Card displaying podcast information.
 * @param {Object} props - Props for the Card component.
 * @param {string} props.title - Title of the podcast.
 * @param {string} props.image - URL of the podcast image.
 * @param {number} props.season - Number of seasons.
 * @param {string} props.genre - Genre(s) of the podcast.
 * @param {string} props.lastUpdated - Last updated date of the podcast information.
 * @param {Function} props.handleShow - Function to handle card click.
 * @param {number} [props.selectedGenre] - Selected genre number (optional).
 * @returns {JSX.Element} JSX representation of the Card component.
 */
const Card = ({ title, image, season, genre, lastUpdated, handleShow, selectedGenre }) => {
  /**
   * Determines whether to display the card based on the selected genre.
   * @type {boolean}
   */
  const shouldDisplay = !selectedGenre || genres[selectedGenre] === genre;

  return shouldDisplay ? (
    <div className='card' onClick={handleShow}>
      <h4 className='card-title'>{title}</h4>
      <div className='card-title-image-container'>
        <img className='card-image' src={image} alt={title} />
      </div>
      <br />
      <section className='card-info'>
        <strong>{season} seasons</strong><br />
        <strong className="genre names">Genres: {genre}</strong><br />
        <strong>Last-updated: </strong><small>{lastUpdated}</small>
      </section>
    </div>
  ) : null;
};

export default Card;
