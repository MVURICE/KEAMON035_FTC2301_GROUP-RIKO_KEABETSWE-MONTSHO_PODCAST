// import React, { useEffect, useState} from 'react';
// import Card from './components/Card';
// import Navbar from './components/Navbar';
// import ShowDetails from './components/ShowDeatils';
// import genreNames from './GenresNames';



// function App() {
//   const [podcast, setPodcast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedShow, setSelectedShow] = useState(null);
 

//   useEffect(() => {
//     fetch('https://podcast-api.netlify.app/shows')
//       .then((res) => res.json())
//       .then((data) => {
//         setPodcast(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error loading podcast data:', error);
//         setLoading(false);
//       });
//   }, []);

//   function handleSelectedShow(id) {
//     fetch(`https://podcast-api.netlify.app/id/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Handle the data for a specific show here
//         setSelectedShow(data);
//         console.log('Show Details:', data);
//       })
//       .catch((error) => {
//         console.error('Error loading show details:', error);
//         setSelectedShow(null); // Reset selected show state if there's an error
//       });
//   }
//   // genreNames[show.genres] ? genreNames[show.genres] : 'No specfic genre'
//   const showElements = podcast.map((show) => (
//     <Card
//       key={show.id}
//       title={show.title}
//       image={show.image}
//       season={show.seasons}
//       genre={ genreNames[show.genres] ? (genreNames[show.genres]) : 'No specfic genre' }
//       lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
//       handleShow={() => handleSelectedShow(show.id)}
//     />
//   ));
 


//   return (
//     <div className='body'>
//       <Navbar />
//       <main>
//         {loading ? <p className='loading'>Loading...</p> : (
//           <div className='shows-preview'>
//             {!selectedShow && showElements}
//             {selectedShow && <ShowDetails show={selectedShow} />}
//           </div>
//         )}
   
//       </main>
      
//     </div>
//   );
// }

// {/* <ShowDetails /> */}


// export default App;

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import ShowDetails from './components/ShowDeatils';
import genreNames from './GenresNames';

function App() {
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z'); // New state for sorting order ('A-Z', 'Z-A', 'ASC_DATE', 'DESC_DATE')

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => res.json())
      .then((data) => {
        setPodcast(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading podcast data:', error);
        setLoading(false);
      });
  }, []);

  function handleSelectedShow(id) {
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
  }

  
// 
  const sortedPodcasts = [...podcast]; // Creating a copy of the podcast array for sorting

  // Sorting function
  sortedPodcasts.sort((a, b) => {
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
// 
  const showElements = sortedPodcasts.map((show) => (
    <Card
      key={show.id}
      title={show.title}
      image={show.image}
      season={show.seasons}
      genre={genreNames[show.genres] ? genreNames[show.genres] : 'No specific genre'}
      lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
      handleShow={() => handleSelectedShow(show.id)}
    />
  ));

  return (
    <div className='body'>
      <Navbar />
      <main>
        <div>
          <button onClick={() => setSortOrder(sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')}>
            {sortOrder === 'A-Z' ? 'Sort Z-A' : 'Sort A-Z'}
          </button>
          <button onClick={() => setSortOrder(sortOrder === 'ASC_DATE' ? 'DESC_DATE' : 'ASC_DATE')}>
            {sortOrder === 'ASC_DATE' ? 'Sort by Newest' : 'Sort by Oldest'}
          </button>
        </div>
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
}

export default App;

