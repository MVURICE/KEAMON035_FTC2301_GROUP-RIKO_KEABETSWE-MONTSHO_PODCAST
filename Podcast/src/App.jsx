
// import logo from './assets/Logo.png'
// import Card from './components/Card'
// import SearchBar from './components/SearchBar'
// import { useEffect,useState } from 'react'
// /* eslint-disable react/prop-types */


// function Navbar(){



//     return(
//       <header>
//         <navbar className='navbar'>
//           <div className='logo-container'>
//           <img className='logo' src={logo} />
//           </div>
//           <ul className=' menu-links'>
//             <li>HOME PAGE</li>
//             <li>GENRES</li>
//             <li>FAVOURITES</li>
//           </ul>
//           <SearchBar  />
//         </navbar>
//       </header>
//     )
//   }







// function App() {





//   const [podcast,setPodacast] = useState([])

  


   
//   useEffect(
//       ()=>{
//         fetch('https://podcast-api.netlify.app/shows')
//         .then(res=> res.json())
//         .then(data => setPodacast(data))
//       },[]
//     )

//     console.log(typeof(podcast))

  
//     const showElements = podcast.map( show =>{
//       return( <Card 
//         key={show.id} 
//         title ={show.title}
//         image = {show.image}  
//         season={show.seasons} 
//         genre={show.genres}
//         lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
//            /> )
//     }
//     )

//     function Main(){

//       return(
//       <body>
//         <main>
//         <Navbar />
//         <div className='shows-preview'>
//         {showElements}
//       </div>
        
//         </main>

//       </body>

//       )
      
//     }




//   return (
//     <div>
//       <Main />
//     </div>

//   )
// }



// export default App



















// import logo from './assets/Logo.png';
// import Card from './components/Card';
// import SearchBar from './components/SearchBar';
// import { useEffect, useState } from 'react';

// function Navbar() {
//   return (
//     <header>
//       <nav className='navbar'>
//         <div className='logo-container'>
//           <img className='logo' src={logo} alt='Logo' />
//         </div>
//         <ul className='menu-links'>
//           <li>HOME PAGE</li>
//           <li>GENRES</li>
//           <li>FAVOURITES</li>
//         </ul>
//         <SearchBar />
//       </nav>
//     </header>
//   );
// }




// function App() {
//   const [podcast, setPodcast] = useState([])  
//   const [loading, setLoading] = useState(true)
//   const [seletedShow, setSelecetedShow] = useState(null)

//   useEffect(() => {

//     fetch('https://podcast-api.netlify.app/shows')
//       .then((res) => res.json())
//       .then((data) => {
//         setPodcast(data)
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error('Error loading podcast data:', error)
//         setLoading(false)
//       })
//   }, [])


//   function handleSelectedShow(id){

//     console.log('askjhdkajsh')
//     fetch(`https://podcast-api.netlify.app/id/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       // Handle the data for a specific show here
//       setSelecetedShow(data)
      
      
      
//       console.log('Show Details:', data);
      
//     })
  
//     // console.log(seletedShow)
   
    
//   }




//   const showElements = podcast.map((show) => (
//     <Card
//       key={show.id}
//       title={show.title}
//       image={show.image}
//       season={show.seasons}
//       genre={show.genres}
//       lastUpdated={new Date(show.updated).toLocaleDateString('en-US')}
//       handleShow={()=>handleSelectedShow(show.id)}
//     />
//   ));

//   function Main() {
//     return (

//       <div className='body'>
//         <Navbar />
//         <main>
//           {loading ? (
//             <p className='loading'>Loading...</p>
//           ) : (
//             <div className='shows-preview'>{showElements}</div>
//           )}
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Main />
//     </div>
//   );
// }

// export default App

















import logo from './assets/Logo.png';
import Card from './components/Card';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';

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
  return (
    <div>
      {/* Display the detailed information of the selected show here */}
      <h2>{show.title}</h2>
      {/* <img src={show.image} alt={show.title} /> */}
      {show.description}
    </div>
  );
}

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

  function Main() {
    return (
      <div className='body'>
        <Navbar />
        <main>
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

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
