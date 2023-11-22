
// /**
//  * Card component represents a card containing information about a TV show or movie.
//  *
//  * @component
//  * @param {Object} props - The props passed to the Card component.
//  * @param {string} props.title - The title of the TV show or movie.
//  * @param {string} props.image - The URL of the image representing the TV show or movie.
//  * @param {number} props.season - The number of seasons of the TV show (can be a float).
//  * @param {string} props.genre - The genre(s) of the TV show or movie.
//  * @param {string} props.lastUpdated - The date when the information was last updated.
//  * @param {Function} props.handleShow - The function to be called when the card is clicked.
//  * @returns {JSX.Element} The JSX representation of the Card component.
//  */
// const Card = ({ title, image, season, genre, lastUpdated, handleShow }) => (
//   <div className='card' onClick={handleShow}>
//     <h4 className='card-title'>{title}</h4>
//     <div className='card-title-image-container'>
//       <img className='card-image' src={image} alt={title} />
//     </div>
//     <br />
//     <section className='card-info'>
//       <strong>{season} seasons</strong><br />
//       <strong className="genre names">Genres: {genre}</strong><br />
//       <strong>Last-updated: </strong><small>{lastUpdated}</small>
//     </section>
//   </div>
// );

// export default Card;

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
 * @returns {JSX.Element} The JSX representation of the Card component.
 */
const Card = ({ title, image, season, genre, lastUpdated, handleShow }) => (
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
);

export default Card;
