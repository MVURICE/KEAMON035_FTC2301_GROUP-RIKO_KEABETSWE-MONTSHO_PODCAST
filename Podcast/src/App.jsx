// import React, { useEffect, useState } from 'react';
// import Card from './components/Card';
// import Navbar from './components/Navbar';
// import ShowDetails from './components/ShowDetials';
// import genreNames from './GenresNames';



// // ✅ All show data loaded via a fetch call from the https://podcast-api.netlify.app/shows

// // ✅ When viewing a specific show, data is loaded via fetch from individual show endpoint

// // ✅ There is a loading state while initial data is being loaded

// /**
//  * Main functional component for the App.
//  * Displays a list of podcasts and allows sorting and selecting individual shows.
//  * @function App
//  * @returns {JSX.Element} The JSX element representing the App.
//  */
// const App = () => {
//   const [podcasts, setPodcasts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedShow, setSelectedShow] = useState(null);
//   const [sortOrder, setSortOrder] = useState('A-Z');
//   const [filteredPodcasts, setFilteredPodcasts] = useState([]);

//   useEffect(() => {
//     fetch('https://podcast-api.netlify.app/shows')
//       .then((res) => res.json())
//       .then((data) => {
//         setPodcasts(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error loading podcast data:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleSelectedShow = (id) => {
//     fetch(`https://podcast-api.netlify.app/id/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSelectedShow(data);
//         console.log('Show Details:', data);
//       })
//       .catch((error) => {
//         console.error('Error loading show details:', error);
//         setSelectedShow(null);
//       });
//   };


// //   ✅ User can arrange the list of shows by title from A-Z

// // ✅ User can arrange the list of shows by title from Z-A

// // ✅ User can arrange the list of shows by date updated in ascending order

// // ✅ User can arrange the list of shows by date updated in descending order
//   const sortedPodcasts = [...(filteredPodcasts.length ? filteredPodcasts : podcasts)].sort((a, b) => {
//     if (sortOrder === 'A-Z') {
//       return a.title.localeCompare(b.title);
//     } else if (sortOrder === 'Z-A') {
//       return b.title.localeCompare(a.title);
//     } else if (sortOrder === 'ASC_DATE') {
//       return new Date(a.updated) - new Date(b.updated);
//     } else if (sortOrder === 'DESC_DATE') {
//       return new Date(b.updated) - new Date(a.updated);
//     }
//   });

//   // ✅ User can see the name of all available shows on the platform

//   // ✅ User sees preview image of shows when browsing
  
//   // ✅ User sees the amount of seasons per show as a number when browsing
  
//   // ✅ User sees a human-readable date as to when a show was last updated
  
//   // ✅ User sees what genres (as genre titles) a show is associated with when browsing


//   const showElements = sortedPodcasts.map((show) => (
//     <Card
//       key={show.id}
//       title={show.title}
//       image={show.image}
//       season={show.seasons}
//       genre={show.genres.map((genreId) => genreNames[genreId]).join(',')}
//       lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
//       handleShow={() => handleSelectedShow(show.id)}
//     />
//   ));

//   const handleHomePage =()=>{
//     setSelectedShow(null)
//   }

//   return (
//     <div className='body'>
//       <Navbar podcasts={podcasts} setFilteredPodcasts={setFilteredPodcasts} homePage={handleHomePage}  />
//       <main>
//         {!selectedShow && (
//           <div className='sorting-buttons-control'>
//             <button className='sorting-button' onClick={() => setSortOrder(sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')}>
//               {sortOrder === 'A-Z' ? 'Sort Z-A' : 'Sort A-Z'}
//             </button>
//             <button className='sorting-button' onClick={() => setSortOrder(sortOrder === 'ASC_DATE' ? 'DESC_DATE' : 'ASC_DATE')}>
//               {sortOrder === 'ASC_DATE' ? 'Sort by Newest' : 'Sort by Oldest'}
//             </button>
//           </div>
//         )}
//         {loading ? (
//           <p className='loading'>Loading...</p>
//         ) : (
//           <div className='shows-preview'>
//             {!selectedShow && showElements}
//             {selectedShow && <ShowDetails show={selectedShow} />}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import ShowDetails from './components/ShowDetials'; // Corrected component name
import genreNames from './GenresNames';

// Constants for sort orders
const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
  AZ: 'A-Z',
  ZA: 'Z-A',
};

const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.AZ); // Use constants
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

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

  const handleGenreFilter = (selectedGenre) => {
    if (selectedGenre === '0') {
      setFilteredPodcasts([]);
    } else {
      const filtered = podcasts.filter((podcast) =>
        podcast.genres.includes(parseInt(selectedGenre))
      );
      setFilteredPodcasts(filtered);
    }
  };

  const sortedPodcasts = [
    ...(filteredPodcasts.length ? [...filteredPodcasts] : [...podcasts]),
  ].sort((a, b) => {
    if (sortOrder === SORT_ORDER.AZ) {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === SORT_ORDER.ZA) {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === SORT_ORDER.ASC) {
      return new Date(a.updated) - new Date(b.updated);
    } else if (sortOrder === SORT_ORDER.DESC) {
      return new Date(b.updated) - new Date(a.updated);
    }
  });

  const showElements = (filteredPodcasts.length ? filteredPodcasts : sortedPodcasts).map((show) => (
    <Card
      key={show.id}
      title={show.title}
      image={show.image}
      season={show.seasons}
      genre={show.genres.map((genreId) => genreNames[genreId]).join(',')}
      lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
      handleShow={() => handleSelectedShow(show.id)}
    />
  ));

  const handleHomePage = () => {
    setSelectedShow(null);
  };

  return (
    <div className='body'>
      <Navbar
        podcasts={podcasts}
        setFilteredPodcasts={setFilteredPodcasts}
        homePage={handleHomePage}
        handleGenreFilter={handleGenreFilter} // Pass the filter function to Navbar
      />
      <main>
        {!selectedShow && (
          <div className='sorting-buttons-control'>
            <button className='sorting-button' onClick={() => setSortOrder(sortOrder === SORT_ORDER.AZ ? SORT_ORDER.ZA : SORT_ORDER.AZ)}>
              {sortOrder === SORT_ORDER.AZ ? 'Sort Z-A' : 'Sort A-Z'}
            </button>
            <button className='sorting-button' onClick={() => setSortOrder(sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC)}>
              {sortOrder === SORT_ORDER.ASC ? 'Sort by Newest' : 'Sort by Oldest'}
            </button>
          </div>
        )}
        {loading && <p className='loading'>Loading...</p>}
        {!selectedShow && <div className='shows-preview'>{showElements}</div>}
        {selectedShow && <ShowDetails show={selectedShow} />}
      </main>
    </div>
  );
};

export default App;
