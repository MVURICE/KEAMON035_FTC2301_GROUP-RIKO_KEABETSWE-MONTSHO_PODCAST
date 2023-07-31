import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import ShowDetails from './components/ShowDetials';
import genreNames from './GenresNames';

/**
 * Main functional component for the App.
 * Displays a list of podcasts and allows sorting and selecting individual shows.
 * @function App
 * @returns {JSX.Element} The JSX element representing the App.
 */
const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');

  /**
   * Fetches the podcast data from the API when the component mounts.
   * @function useEffect
   * @memberof App
   */
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading podcast data:', error);
        setLoading(false);
      });
  }, []);

  /**
   * Handles the selection of a specific show by its ID.
   * Fetches and sets the selected show's details from the API.
   * @function handleSelectedShow
   * @memberof App
   * @param {string} id - The ID of the selected show.
   */
  const handleSelectedShow = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedShow(data);
        console.log('Show Details:', data);
      })
      .catch((error) => {
        console.error('Error loading show details:', error);
        setSelectedShow(null);
      });
  };

  /**
   * Sorts the podcasts based on the selected sorting order.
   * @function sortedPodcasts
   * @memberof App
   */
  const sortedPodcasts = [...podcasts].sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'Z-A') {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === 'ASC_DATE') {
      return new Date(a.updated) - new Date(b.updated);
    } else if (sortOrder === 'DESC_DATE') {
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  /**
   * Maps the sorted podcasts to individual Card components.
   * @function showElements
   * @memberof App
   */
  const showElements = sortedPodcasts.map((show) => (
    <Card
      key={show.id}
      title={show.title}
      image={show.image}
      season={show.seasons}
      genre={show.genres
        .map((genreId) => genreNames[genreId]).join(',')}
      lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
      handleShow={() => handleSelectedShow(show.id)}
    />
  ));

  return (
    <div className='body'>
      <Navbar />
      <main>
        {!selectedShow && (
          <div className='sorting-buttons-control'>
            <button className='sorting-button' onClick={() => setSortOrder(sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')}>
              {sortOrder === 'A-Z' ? 'Sort Z-A' : 'Sort A-Z'}
            </button>
            <button className='sorting-button' onClick={() => setSortOrder(sortOrder === 'ASC_DATE' ? 'DESC_DATE' : 'ASC_DATE')}>
              {sortOrder === 'ASC_DATE' ? 'Sort by Newest' : 'Sort by Oldest'}
            </button>
          </div>
        )}
        {loading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <div className='shows-preview'>
            {!selectedShow && showElements}
            {selectedShow && <ShowDetails show={selectedShow} />}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;


