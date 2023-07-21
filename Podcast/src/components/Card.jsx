// import logo from '../assets/logo.png'
// import favorite from '../assets/filledHeart.png'
// import notfavorite from '../assets/emptyHeart.png'
// import { useState,useEffect } from 'react'





export default function Card ({title,image,season,genre,lastUpdated,handleShow}){

  // function handleShow(){
  //   console.log('sjhajhgdjhas')
  // }

  return(  
  <div className='card' onClick={handleShow}>
    <h4 className='card-title'>{title}</h4>
    <div className='card-title-image-container'>
      <img className='card-image' src={image} />
    </div>
    <br />
    <section className='card-info'>
      <strong>{season} seasons</strong><br />
      <strong>Genres: {genre} </strong> <br />
      <strong>Last-updated: </strong><small>{lastUpdated}</small> 
  
    </section>
  </div>
  )
  }