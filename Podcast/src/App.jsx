
import React, { useEffect, useState,useRef } from 'react';
import logo from './assets/Logo.png';
import Card from './components/Card';
import SearchBar from './components/SearchBar';
import SeasonCard from './components/SeasonCard';
import Episodes from './components/Episodes';



function App() {
  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);
 

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
        // Handle the data for a specific show here
        setSelectedShow(data);
        console.log('Show Details:', data);
      })
      .catch((error) => {
        console.error('Error loading show details:', error);
        setSelectedShow(null); // Reset selected show state if there's an error
      });
  }

  const showElements = podcast.map((show) => (
    <Card
      key={show.id}
      title={show.title}
      image={show.image}
      season={show.seasons}
      genre={show.genres}
      lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
      handleShow={() => handleSelectedShow(show.id)}
    />
  ));
 


  return (
    <div className='body'>
      <Navbar />
      <main>
        {loading ? <p className='loading'>Loading...</p> : (
          <div className='shows-preview'>
            {!selectedShow && showElements}
            {selectedShow && <ShowDetails show={selectedShow} />}
          </div>
        )}
   
      </main>
      
    </div>
  );
}

function Navbar() {
  return (
    <header>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt='Logo' />
        </div>
        <ul className='menu-links'>
          <li>HOME PAGE</li>
          <li>GENRES</li>
          <li>FAVOURITES</li>
        </ul>
        <SearchBar />
      </nav>
    </header>
  );
}


function ShowDetails({ show }) {

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [currentTrack, setCurrentTrack] = useState('');
  const [clickedEpisodeMeta,setClickedEpisodeMeta] = useState('')
 

  

  function handleEpisodePlay(episode){
    // console.log(file)
    setCurrentTrack(episode.file)
    setClickedEpisodeMeta(episode)
    console.log('the whole episode is',clickedEpisodeMeta)
    console.log('the current track is',currentTrack)
    // console.log(audioRef)
  }
  

  function handleSeasonClick(season) {
    console.log('Clicked season:', season);
    // Add any other logic related to handling the clicked season here
    setSelectedSeason(season); // Set the selected season
  }

  return (
    <div className='seasons'>
      
    <div className='show-hero-banner'>
      <div className='show-image-container'>
        <img className='show-image' src={selectedSeason ? selectedSeason.image : show.image} alt={show.title} />
      </div>
      <br />
      <section className='show-metadata'>
        <h4 className='show-card-title'>{selectedSeason ? selectedSeason.title: show.title}</h4>
        <button>Favourite</button>
        <br />
        <br />
        <strong>{selectedSeason ? (selectedSeason.episodes && selectedSeason.episodes.length) :(show.seasons && show.seasons.length)} {selectedSeason? 'episodes':'seasons'}</strong><br />
        {selectedSeason ? '':<strong>Genres: <small><em>{show.genres ? show.genres.join(', ') : 'No specific Genre'}</em></small> </strong>} <br />
        <strong>Last-updated: </strong><small>{show.updated && new Date(show.updated).toLocaleDateString('en-US')}</small>
      </section>
      {selectedSeason? <section className='show-description'></section> : <section className='show-description'>
        <h4 className='description-header'>About:</h4>
        <br />
        <p className='description-paragraph'>{show.description}</p>
      </section>}
  
     
    </div>

    
    <div className='show-seasons'>
        {!selectedSeason && show.seasons && show.seasons.map((season) => (
          <SeasonCard  
            key={season.id} 
            title={season.title}
            image={season.image}
            episodes={season.episodes.length}
            handleClick={()=>handleSeasonClick(season)} // Pass the season object to handleSeasonClick
          />
        ))}
      </div>

      {selectedSeason && 
        <div className="episodes">

          <div className="show-episodes">
            {selectedSeason && selectedSeason.episodes.map((episode)=>{
              return(
                <Episodes 
                key ={episode.id}
                title={episode.title}
                image ={episode.image}
                play={()=>handleEpisodePlay(episode)}
                description={episode.description}/>
              )
              
            })}
            
          </div>
          
    
        </div>
      }

    </div>
  );
}



export default App;
