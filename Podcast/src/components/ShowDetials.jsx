import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SeasonCard from './SeasonCard';
import Episodes from './Episodes';
import AudioPlayer from './AudioPlayer';
import backbutton from '../assets/backbutton.png';

/**
 * ShowDetails component displays detailed information about a TV show, including seasons and episodes.
 *
 * @component
 * @param {Object} props - The props passed to the ShowDetails component.
 * @param {Object} props.show - The show object containing information about the TV show.
 * @returns {JSX.Element} The JSX representation of the ShowDetails component.
 */
const ShowDetails = ({ show }) => {
  // State variables
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [clickedEpisodeMeta, setClickedEpisodeMeta] = useState('');
  const [favouriteEpisodes, setFavouriteEpisodes] = useState([]);
  const [showFavouriteEpisodes, setShowFavouriteEpisodes] = useState(false); // New state variable


  const handleSeasonBackbutton =()=>{
    console.log('y')
    setSelectedSeason(null)
    setShowFavouriteEpisodes(false)
  }

  /**
   * Handles the "Favourite" button click for an episode.
   *
   * @param {Object} episode - The episode object.
   * @returns {void}
   */
  const handlefavourites = (episode) => {
    console.log('you clicked favourite');

    const isEpisodeInFavourites = favouriteEpisodes.some(
      (favEpisode) => favEpisode.title === episode.title
    );

    const updatedFavouriteEpisodes = [...favouriteEpisodes];

    if (isEpisodeInFavourites) {
      const updatedFavouritesWithoutEpisode = updatedFavouriteEpisodes.filter(
        (favEpisode) => favEpisode.title !== episode.title
      );

      setFavouriteEpisodes(updatedFavouritesWithoutEpisode);
    } else {
      updatedFavouriteEpisodes.push(episode);
      setFavouriteEpisodes(updatedFavouriteEpisodes);
    }

    console.log('your favourites are', favouriteEpisodes);
  };

  const handleFavouriteEpisodes = () => {
    // Toggle the showFavouriteEpisodes state
    setShowFavouriteEpisodes(!showFavouriteEpisodes);
  };

  /**
   * Handles the back button click for episodes to return to seasons view.
   *
   * @returns {void}
   */
  const handleEpisodeBackBtn = () => {
    console.log('You have pressed the back button');
    setSelectedSeason(null);
  };

  /**
   * Handles the "Play" button click for an episode.
   *
   * @param {Object} episode - The episode object.
   * @returns {void}
   */
  const handleEpisodePlay = (episode) => {
    setSelectedTrack(episode.file);
    setClickedEpisodeMeta(episode);
    console.log('The whole episode is', clickedEpisodeMeta);
    console.log('The selected track is', selectedTrack);
  };

  /**
   * Handles the click on a season to view episodes.
   *
   * @param {Object} season - The season object.
   * @returns {void}
   */
  const handleSeasonClick = (season) => {
    console.log('Clicked season:', season);
    setSelectedSeason(season);
  };

  return (
    <>
      <div className='seasons'>
        <div className='show-hero-banner'>
          <div className='show-image-container'>
            <img src={backbutton} alt='back button' onClick={handleSeasonBackbutton} className='season-back-button' />
            <img className='show-image' src={selectedSeason ? selectedSeason.image : show.image} alt={show.title} />
          </div>
          <br />
          <section className='show-metadata'>
            <h4 className='show-card-title'>{selectedSeason ? selectedSeason.title : show.title}</h4>
            <button className='all-favourites-button' onClick={handleFavouriteEpisodes}>All Favourites</button>
            <br />
            <br />
            <strong>
              {selectedSeason ? (selectedSeason.episodes && selectedSeason.episodes.length) : (show.seasons && show.seasons.length)} {selectedSeason ? 'episodes' : 'seasons'}
            </strong>
            <br />
            {!selectedSeason && (
              <strong>
                Genres: <small><em>{show.genres ? show.genres.join(', ') : 'No specific Genre'}</em></small>{' '}
              </strong>
            )}
            <br />
            <strong>Last-updated: </strong>
            <small>{show.updated && new Date(show.updated).toLocaleDateString('en-US')}</small>
          </section>
          {selectedSeason ? (
            <section className='show-description'></section>
          ) : (
            <section className='show-description'>
              <h4 className='description-header'>About:</h4>
              <br />
              <p className='description-paragraph'>{show.description}</p>
            </section>
          )}
        </div>

        {!showFavouriteEpisodes && !selectedSeason && (
          <div className='show-seasons'>
            {show.seasons &&
              show.seasons.map((season) => (
                <SeasonCard
                  key={uuidv4()}
                  title={season.title}
                  image={season.image}
                  episodes={season.episodes.length}
                  handleClick={() => handleSeasonClick(season)}
                />
              ))}
          </div>
        )}

        {!showFavouriteEpisodes && selectedSeason && (
          <div className='episodes'>
            <div className='show-episodes'>
              <div className='return-to-seasons'>
                <img src={backbutton} alt='back button' onClick={handleEpisodeBackBtn} className='episode-back-button' />
                <h1>seasons</h1>
              </div>
              {selectedSeason &&
                selectedSeason.episodes.map((episode) => (
                  <Episodes
                    key={uuidv4()}
                    title={episode.title}
                    image={episode.image}
                    play={() => handleEpisodePlay(episode)}
                    description={episode.description}
                    favourite={() => handlefavourites(episode)}
                    isFavourite={
                      favouriteEpisodes.some(
                        (favEpisode) => favEpisode.title === episode.title
                      )
                    }
                  />
                ))}
            </div>
          </div>
        )}

        {showFavouriteEpisodes && (
          <div className='show-episodes'>
            <h2 className='favourites-header'>Your Favorite Episodes</h2>
            {favouriteEpisodes.length === 0 ? (
              <p>You haven't added any episodes to your favorites yet.</p>
            ) : (
              <div>
                {favouriteEpisodes.map((episode) => (
                  <Episodes
                    key={uuidv4()}
                    title={episode.title}
                    image={episode.image}
                    play={() => handleEpisodePlay(episode)}
                    description={episode.description}
                    favourite={() => handlefavourites(episode)}
                    isFavourite={
                      favouriteEpisodes.some(
                        (favEpisode) => favEpisode.title === episode.title
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTrack && (
          <AudioPlayer selectedTrack={selectedTrack} title={clickedEpisodeMeta.title} episode={clickedEpisodeMeta.episode} />
        )}
      </div>
    </>
  );
};

export default ShowDetails;
