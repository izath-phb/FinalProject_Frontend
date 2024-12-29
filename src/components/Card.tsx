import React from 'react'

interface AnimeList {
  name:string;
  duration:string
  image:string
  url:string
}

function Card({name, duration,image, url}:AnimeList) {
  return (
    <div className="card my-2">
    <div className='container-fluid' style={{height:'400px', overflow:'hidden'}}>
      <img src={image} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body">
      <h5 className="card-title text-truncate">{ name }</h5>
      <p className="card-text">{ duration }</p>
      <a href={url} className="btn btn-primary" target='_blank'>Go somewhere</a>
    </div>
  </div>
  )
}

export default Card
